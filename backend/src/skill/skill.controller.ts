import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dtos/CreateSkillDto.dto';
import { UpdateSkillDto } from './dtos/UpdateSkillDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from 'src/auth/common/guards';
import { Public } from 'src/auth/common/decorators';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Public()
  @Get()
  async getAllSkills() {
    const skills = await this.skillService.getAllSkills();
    return skills;
  }

  @Public()
  @Get(':id')
  async getSkillById(@Param('id') id: number) {
    try {
      const skill = await this.skillService.getSkillById(id);
      return skill;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Skill with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @Post()
  async createSkill(@Body() createSkillDto: CreateSkillDto) {
    const skill = await this.skillService.createSkill(createSkillDto);
    return skill;
  }

  @Put(':id')
  async updateSkill(
    @Param('id') id: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    try {
      const skill = await this.skillService.updateSkill(id, updateSkillDto);
      return skill;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Skill with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: number) {
    try {
      await this.skillService.deleteSkill(id);
      return { message: `Skill with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Section with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }
}
