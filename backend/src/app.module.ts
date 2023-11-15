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
import { SectionModule } from './section/section.module';
import { SkillModule } from './skill/skill.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';
import { SectionImageModule } from './section-image/section-image.module';
import { ExperienceModule } from './experience/experience.module';
import { ExperiencePartModule } from './experience-part/experience-part.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    RefreshTokenModule,
    UserModule,
    CloudinaryModule,
    ProjectImageModule,
    ProjectModule,
    SectionModule,
    SkillModule,
    SectionImageModule,
    ExperienceModule,
    ExperiencePartModule
  ],
  controllers: [MailController],
  providers: [
    SendgridService,
    CloudinaryService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
