import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const message = await this.authService.register(registerDto);
    return { message };
  }
}