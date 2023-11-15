// cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionImage } from './section-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionImage]),],
  providers: [],
  exports: [],
})
export class SectionImageModule {}
