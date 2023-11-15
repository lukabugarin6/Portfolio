import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperiencePart } from 'src/experience-part/experience-part.entity';
import { Experience } from 'src/experience/experience.entity';
import { ProjectImage } from 'src/project-image/project-image.entity';
import { Project } from 'src/project/project.entity';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { SectionImage } from 'src/section-image/section-image.entity';
import { Section } from 'src/section/section.entity';
import { Skill } from 'src/skill/skill.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_ADDON_HOST'),
        database: configService.get<string>('MYSQL_ADDON_DB'),
        username: configService.get<string>('MYSQL_ADDON_USER'),
        password: configService.get<string>('MYSQL_ADDON_PASSWORD'),
        port: configService.get<number>('MYSQL_ADDON_PORT'),
        entities: [
          User,
          Project,
          ProjectImage,
          Section,
          Skill,
          RefreshToken,
          SectionImage,
          Experience,
          ExperiencePart,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
