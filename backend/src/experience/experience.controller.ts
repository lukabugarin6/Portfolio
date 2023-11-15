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
    UseInterceptors,
    UploadedFiles,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { AtGuard } from 'src/auth/common/guards';
  import { Public } from 'src/auth/common/decorators';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dtos/CreateExperienceDto.dto';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto.dto';
  
  @Controller('experiences')
  export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}
  
    @Public()
    @Get()
    async getAllExperiences() {
      const experiences = await this.experienceService.getAllExperiences();
      return experiences;
    }

    @Post()
    async createExperience(
      @Body() createExperienceDto: CreateExperienceDto,
    ) {
      const experience = await this.experienceService.createExperience(
        createExperienceDto,
      );
      return experience;
    }
  
    @Put(':id')
    async updateProject(
      @Param('id') id: number,
      @Body() updateExperienceDto: UpdateExperienceDto,
    ) {
      try {
        const experience = await this.experienceService.updateExperience(
          id,
          updateExperienceDto,
        );
        return experience;
      } catch (error) {
        if (error instanceof NotFoundException) {
          // Handle not found error
          throw new NotFoundException(`Experience with ID ${id} not found`);
        }
        // Handle other errors
        throw error;
      }
    }
  
    @Delete(':id')
    async deleteExperience(@Param('id') id: number) {
      try {
        await this.experienceService.deleteExperience(id);
        return { message: `Experience with ID ${id} deleted successfully` };
      } catch (error) {
        if (error instanceof NotFoundException) {
          // Handle not found error
          throw new NotFoundException(`Experience with ID ${id} not found`);
        }
        // Handle other errors
        throw error;
      }
    }
  }
  