import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionImage } from 'src/section-image/section-image.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, SectionImage]),
    CloudinaryModule,
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
