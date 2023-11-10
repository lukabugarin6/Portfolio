import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImage } from 'src/project-image/project-image.entity';
import { Project } from 'src/project/project.entity';
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
        entities: [User, Project, ProjectImage],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
