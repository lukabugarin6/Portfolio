import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ProjectImageModule } from './project-image/project-image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    CloudinaryModule,
    ProjectImageModule,
    ProjectModule,
  ],
  controllers: [MailController],
  providers: [SendgridService, CloudinaryService],
})
export class AppModule {}
