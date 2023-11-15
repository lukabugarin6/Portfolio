import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProjectImage } from 'src/project-image/project-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectImage]), CloudinaryModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
