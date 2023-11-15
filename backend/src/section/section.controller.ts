import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dtos/CreateSectionDto.dto';
import { UpdateSectionDto } from './dtos/UpdateSectionDto.dto';
import { Public } from 'src/auth/common/decorators';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Public()
  @Get()
  async getAllSections() {
    const sections = await this.sectionService.getAllSections();
    return sections;
  }

  @Public()
  @Get(':identifier')
  async getProjectById(@Param('identifier') identifier: string) {
    try {
      const section =
        await this.sectionService.getSectionByIdentifier(identifier);
      return section;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(
          `Section with identifier ${identifier} not found`,
        );
      }
      // Handle other errors
      throw error;
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createSection(
    @Body() createSectionDto: CreateSectionDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const section = await this.sectionService.createSection(
      createSectionDto,
      images,
    );
    return section;
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async updateSection(
    @Param('id') id: number,
    @Body() updateSectioDto: UpdateSectionDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      const section = await this.sectionService.updateSection(
        id,
        updateSectioDto,
        images,
      );
      return section;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Section with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @Delete(':id')
  async deleteSection(@Param('id') id: number) {
    try {
      await this.sectionService.deleteSection(id);
      return { message: `Section with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle not found error
        throw new NotFoundException(`Section with ID ${id} not found`);
      }
      // Handle other errors
      throw error;
    }
  }

  @Delete(':id/images')
  async deleteSectionImage(
    @Param('id') projectId: number,
    @Body('imageId') imageId: number,
  ): Promise<{ message: string }> {
    try {
      await this.sectionService.deleteSectionImage(projectId, imageId);
      return { message: `Image deleted successfully` };
    } catch (error) {
      // Handle specific errors if needed
      throw error;
    }
  }
}
