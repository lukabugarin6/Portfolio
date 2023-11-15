import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken]), UserModule, JwtModule.register({})],
  controllers: [],
  providers: [RefreshTokenService, AuthService],
})
export class RefreshTokenModule {}
