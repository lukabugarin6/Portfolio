import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dtos/LoginDto";
import { RegisterDto } from "./dtos/RegisterDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const foundUser = await this.userService.findByUsername(loginDto.username);

    if (!foundUser) {
      throw new UnauthorizedException("User not found");
    }

    const passwordIsValid = await this.validatePassword(
      loginDto.password,
      foundUser.password
    );

    if (passwordIsValid) {
      const payload = { sub: foundUser.id, username: foundUser.username };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException("Invalid password");
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.userService.findByUsername(
      registerDto.username
    );

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    const hashedPassword = await this.hashPassword(registerDto.password);

    const newUser = await this.userService.create({
      username: registerDto.username,
      password: hashedPassword,
    });

    return { message: "User registered successfully" };
  }

  private async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}