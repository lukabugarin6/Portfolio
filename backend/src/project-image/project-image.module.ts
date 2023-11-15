// cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ProjectImage } from './project-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectImage]),],
  providers: [],
  exports: [],
})
export class ProjectImageModule {}
