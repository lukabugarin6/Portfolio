import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { CreateExperienceDto } from './dtos/CreateExperienceDto.dto';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto.dto';
import { ExperiencePartService } from 'src/experience-part/experience-part.service';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly experiencePartService: ExperiencePartService,
  ) {}

  async getAllExperiences(): Promise<Experience[]> {
    return await this.experienceRepository.find({
      relations: ['experience_parts'],
      order: { id: 'ASC' },
    });
  }

  async createExperience(
    createExperienceDto: CreateExperienceDto,
  ): Promise<Experience> {
    const { experience_parts, ...createExperienceData } = createExperienceDto;

    const experience = this.experienceRepository.create({
      ...createExperienceData,
      createdAt: new Date(),
    });

    const savedExperience = await this.experienceRepository.save(experience);

    let experience_parts_data = [];
    if (experience_parts && experience_parts.length > 0) {
      for (const experience_part of experience_parts) {
        const ep = await this.experiencePartService.createExperiencePart(
          experience_part,
          experience,
        );

        experience_parts_data.push(ep);
      }
    }

    if (experience_parts_data && experience_parts_data.length > 0) {
      savedExperience.experience_parts = experience_parts_data;
    }

    return savedExperience;
  }

  async updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<Experience> {
    const { experience_parts, ...updateExperienceData } = updateExperienceDto;

    const experience = await this.experienceRepository.findOne({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    if (experience_parts && experience_parts.length > 0) {
      for (const experience_part of experience.experience_parts) {
        this.experiencePartService.updateExperiencePart(
          experience_part.id,
          experience_part,
          experience
        );
      }
    }

    // Update other project properties
    Object.assign(experience, updateExperienceData);

    return await this.experienceRepository.save(experience);
  }

  async deleteExperience(id: number): Promise<void> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      relations: ['images'], // Load the images with the project
    });

    if (!experience) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (experience.experience_parts) {
      for (const experience_part of experience.experience_parts) {
        await this.experiencePartService.deleteExperiencePart(
          experience_part.id,
        );
      }
    }

    await this.experienceRepository.remove(experience);
  }

  async deleteExperienceParts(
    projectId: number,
    imageIds: number[],
  ): Promise<void> {}
}
