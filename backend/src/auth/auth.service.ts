import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private config: ConfigService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const foundUser = await this.userService.findByUsername(loginDto.username);

    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }

    const passwordIsValid = argon.verify(
      foundUser.password,
      loginDto.password,
    );

    const tokens = await this.getTokens(foundUser.id, foundUser.username);
    await this.updateRefreshTokenHash(foundUser.id, tokens.refresh_token);

    if (passwordIsValid) {
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    }

    throw new UnauthorizedException('Invalid password');
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const existingUser = await this.userService.findByUsername(
      registerDto.username,
    );

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await argon.hash(registerDto.password);

    const newUser = await this.userService.create({
      username: registerDto.username,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.createRefreshTokenHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.refreshTokenService.delete(userId);

    return true;
  }

  async refreshTokens(userId: number, refresh_token: string) {
    const token = await this.refreshTokenService.findByUserId(userId);
    const user = await this.userService.findById(userId);

    if (!user || !token) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(token.token, refresh_token);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  private async getTokens(
    userId: number,
    username: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRefreshTokenHash(userId: number, refresh_token: string) {
    const hash = await argon.hash(refresh_token);

    this.refreshTokenService.update(userId, hash);
  }

  private async createRefreshTokenHash(userId: number, refresh_token: string) {
    const hash = await argon.hash(refresh_token);

    this.refreshTokenService.create(userId, hash);
  }
}
