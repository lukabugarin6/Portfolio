// cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ExperiencePartService } from './experience-part.service';
import { ExperiencePart } from './experience-part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExperiencePart]),],
  providers: [ExperiencePartService],
  exports: [ExperiencePartService],
})
export class ExperiencePartModule {}
