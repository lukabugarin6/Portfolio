import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { ExperiencePart } from 'src/experience-part/experience-part.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { ExperiencePartModule } from 'src/experience-part/experience-part.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience, ExperiencePart]),
    ExperiencePartModule,
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
