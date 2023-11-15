import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGuard, RtGuard } from './common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const tokens = await this.authService.login(loginDto);
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  // @UseGuards(AuthGuard)
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const message = await this.authService.register(registerDto);
    return { message };
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
