import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { hashSync } from 'bcrypt';
import { CreateRefreshTokenDto } from './dtos/CreateRefreshTokenDto.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  private getExpiresAt(): Date {
    const expiresInDays = 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    return expiresAt;
  }

  async create(userId: number, refresh_token: string): Promise<RefreshToken> {
    const expiresAt = this.getExpiresAt();

    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token: refresh_token, // Hash the token before storing
      expiresAt,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  async update(userId: number, hashed_token: string): Promise<RefreshToken> {
    const expiresAt = this.getExpiresAt();

    const token = await this.refreshTokenRepository.findOne({
      where: { userId },
    });

    if (!token) {
      return this.create(userId, hashed_token)
    }

    Object.assign(token, {
      token: hashed_token,
      expiresAt,
    });

    return this.refreshTokenRepository.save(token);
  }

  async delete(userId: number) {
    const token = await this.refreshTokenRepository.findOne({
        where: { userId },
      });
  
      if (!token) {
        // throw new NotFoundException(`Token not found`);
        return;
      }
  
      await this.refreshTokenRepository.remove(token);
  }

  async findByUserId(userId: number): Promise<RefreshToken | undefined> {
    return this.refreshTokenRepository.findOne({ where: { userId } });
  }

  async findByToken(token: string): Promise<RefreshToken | undefined> {
    const hashedToken = hashSync(token, 10); // Hash the token before comparing
    return this.refreshTokenRepository.findOne({
      where: { token: hashedToken },
    });
  }
}