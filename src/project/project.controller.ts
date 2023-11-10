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
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/CreateProjectDto.dto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectImage } from 'src/project-image/project-image.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();
    return projects;
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    try {
      const project = await this.projectService.getProjectById(id);
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() images: any,
  ) {
    const project = await this.projectService.createProject(
      createProjectDto,
      images,
    );
    return project;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      const project = await this.projectService.updateProject(
        id,
        updateProjectDto,
        images,
      );
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    try {
      await this.projectService.deleteProject(id);
      return { message: `Project with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id/images')
  async deleteProjectImages(
    @Param('id') projectId: number,
    @Body('imageIds') imageIds: number[],
  ): Promise<{ message: string }> {
    try {
      await this.projectService.deleteProjectImages(projectId, imageIds);
      return { message: `Images deleted successfully` };
    } catch (error) {
      // Handle specific errors if needed
      throw error;
    }
  }
}
