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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/CreateProjectDto.dto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto.dto';
import { AtGuard } from 'src/auth/common/guards';
import { Public } from 'src/auth/common/decorators';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Public()
  @Get()
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();
    return projects;
  }

  @Public()
  @Get(':slug')
  async getProjectById(@Param('slug') slug: string) {
    try {
      const project = await this.projectService.getProjectBySlug(slug);
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Project with slug ${slug} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const project = await this.projectService.createProject(
      createProjectDto,
      images,
    );
    return project;
  }

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
