import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dtos/CreateSectionDto.dto';
import { UpdateSectionDto } from './dtos/UpdateSectionDto.dto';
import { Section } from './section.entity';
import { SectionImage } from 'src/section-image/section-image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(SectionImage)
    private readonly sectionImageRepository: Repository<SectionImage>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAllSections(): Promise<Section[]> {
    return await this.sectionRepository.find({
      relations: ['image'],
      order: { id: 'ASC' },
    });
  }

  async getSectionByIdentifier(identifier: string): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { identifier },
      relations: ['image'],
    });

    if (!section) {
      throw new NotFoundException(
        `Section with identifier ${identifier} not found`,
      );
    }

    return section;
  }

  async createSection(
    createSectionDto: CreateSectionDto,
    images: Express.Multer.File[],
  ): Promise<Section> {
   

    const section = this.sectionRepository.create({
      ...createSectionDto,
      createdAt: new Date(),
    });

    const savedSection = await this.sectionRepository.save(section);

    if (images && images.length > 0) {      
      const uploadedImage = await this.cloudinaryService.uploadImages(images);
  
      const sectionImage = this.sectionImageRepository.create({
        imageUrl: uploadedImage[0].secure_url,
        publicId: uploadedImage[0].public_id,
        section: savedSection,
      });
  
      await this.sectionImageRepository.save(sectionImage);
  
      savedSection.image = sectionImage;
    }

    return savedSection;
  }

  async updateSection(
    id: number,
    updateSectionDto: UpdateSectionDto,
    images: Express.Multer.File[],
  ): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { id },
      relations: ['image'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    if (images) {
      const uploadedImage = await this.cloudinaryService.uploadImages(images);

      const sectionImage = this.sectionImageRepository.create({
        imageUrl: uploadedImage[0].secure_url,
        publicId: uploadedImage[0].public_id,
        section,
      });

      // Save new project images
      await this.sectionImageRepository.save([sectionImage]);

      section.image = sectionImage;
    }

    Object.assign(section, updateSectionDto);

    return await this.sectionRepository.save(section);
  }

  async deleteSection(id: number): Promise<void> {
    const section = await this.sectionRepository.findOne({
      where: { id },
      relations: ['image'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    if (section.image) {
      this.cloudinaryService.deleteImage(section.image.publicId);

      await this.sectionImageRepository.remove(section.image);
    }

    await this.sectionRepository.remove(section);
  }

  async deleteSectionImage(sectionId: number, imageId: number): Promise<void> {
    // Check if imageIds is an empty array
    if (!imageId) {
      throw new BadRequestException('No image ID provided. Nothing to delete.');
    }

    const section = await this.sectionRepository.findOne({
      where: { id: sectionId },
      relations: ['image'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${sectionId} not found`);
    }

    // Verify that all image IDs in the request belong to the project
    if (section.image.id !== imageId) {
      throw new BadRequestException(`Section does not contain sent image`);
    } else {
      this.cloudinaryService.deleteImage(section.image.publicId);

      await this.sectionImageRepository.remove([section.image]);
    }
  }
}
