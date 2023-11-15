import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperiencePart } from './experience-part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperiencePartDto } from './dtos/CreateExperiencePart.dto';
import { UpdateExperiencePartDto } from './dtos/UpdateExperiencePart.dto';
import { Experience } from 'src/experience/experience.entity';

@Injectable()
export class ExperiencePartService {
  constructor(
    @InjectRepository(ExperiencePart)
    private readonly experiencePartRepository: Repository<ExperiencePart>,
  ) {}

  async createExperiencePart(createExperiencePartDto: CreateExperiencePartDto, experience: Experience) {
    const experience_part = this.experiencePartRepository.create({
      ...createExperiencePartDto,
      createdAt: new Date(),
      experience
    });

    const saved_experience_part = await this.experiencePartRepository.save(experience_part);

    return saved_experience_part;
  }

  async updateExperiencePart(
    id: number,
    updateExperiencePartDto: UpdateExperiencePartDto,
    experience: Experience
  ) {
    const experience_part = await this.experiencePartRepository.findOne({
      where: { id },
    });

    if (!experience_part) {
      if (
        updateExperiencePartDto.title &&
        updateExperiencePartDto.description
      ) {
        this.createExperiencePart(
          updateExperiencePartDto as CreateExperiencePartDto,
          experience
        );
      } else {
        throw new Error(`Experience part has all fields required.`);
      }
    }

    Object.assign(experience_part, updateExperiencePartDto);

    return await this.experiencePartRepository.save(experience_part);
  }

  async deleteExperiencePart(id: number): Promise<void> {
    const experience_part = await this.experiencePartRepository.findOne({
      where: { id },
      relations: ['images'], // Load the images with the project
    });

    if (!experience_part) {
      throw new NotFoundException(`Experience Part with ID ${id} not found`);
    }

    await this.experiencePartRepository.remove(experience_part);
  }
}
