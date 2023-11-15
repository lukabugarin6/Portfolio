import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([RefreshToken]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, RefreshTokenService],
  exports: [AuthService],
})
export class AuthModule {}
