import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './dtos/CreateSkillDto.dto';
import { UpdateSkillDto } from './dtos/UpdateSkillDto.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async getAllSkills(): Promise<Skill[]> {
    return await this.skillRepository.find({
      order: { order: 'ASC' },
    });
  }

  async getSkillById(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return skill;
  }

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create({
      ...createSkillDto,
      createdAt: new Date(),
    });

    const savedSkill = await this.skillRepository.save(skill);

    return savedSkill;
  }

  async updateSkill(
    id: number,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    Object.assign(skill, updateSkillDto);

    return await this.skillRepository.save(skill);
  }

  async deleteSkill(id: number): Promise<void> {
    const skill = await this.skillRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    await this.skillRepository.remove(skill);
  }
}
