import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dtos/CreateProjectDto.dto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProjectImage } from 'src/project-image/project-image.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private readonly projectImageRepository: Repository<ProjectImage>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['images'],
      order: { id: 'ASC' },
    });
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    images: any,
  ): Promise<Project> {
    const uploadedImageUrls = await this.cloudinaryService.uploadImages(images);

    const project = this.projectRepository.create({
      ...createProjectDto,
      createdAt: new Date(),
    });

    const savedProject = await this.projectRepository.save(project);

    const projectImages = uploadedImageUrls.map(({ secure_url, public_id }) => {
      const projectImage = this.projectImageRepository.create({
        imageUrl: secure_url,
        publicId: public_id,
        project: savedProject,
      });
      return projectImage;
    });

    await this.projectImageRepository.save(projectImages);

    savedProject.images = projectImages;

    return savedProject;
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
    images: Express.Multer.File[],
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (images && images.length > 0) {
      // Upload only new images to Cloudinary
      const uploadedImageUrls =
        await this.cloudinaryService.uploadImages(images);

      // Create new project images for the uploaded URLs
      const projectImages = uploadedImageUrls.map(
        ({ secure_url, public_id }) => {
          const projectImage = this.projectImageRepository.create({
            imageUrl: secure_url,
            publicId: public_id,
            project,
          });
          return projectImage;
        },
      );

      // Save new project images
      await this.projectImageRepository.save(projectImages);

      project.images = [...project.images, ...projectImages];
    }

    // Update other project properties
    Object.assign(project, updateProjectDto);

    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['images'], // Load the images with the project
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (project.images) {
      // Delete images from Cloudinary
      for (const image of project.images) {
        await this.cloudinaryService.deleteImage(image.publicId);
      }

      // Remove associated project images
      await this.projectImageRepository.remove(project.images);
    }

    // Remove the project
    await this.projectRepository.remove(project);
  }

  async deleteProjectImages(
    projectId: number,
    imageIds: number[],
  ): Promise<void> {
    // Check if imageIds is an empty array
    if (imageIds.length === 0) {
      throw new BadRequestException(
        'No image IDs provided. Nothing to delete.',
      );
    }

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['images'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verify that all image IDs in the request belong to the project
    const invalidImageIds = imageIds.filter(
      (imageId) =>
        !project.images.some((image) => Number(image.id) === imageId),
    );

    if (invalidImageIds.length > 0) {
      throw new BadRequestException(
        `Project does not contain one of the images`,
      );
    }

    // Filter out the images to be deleted
    const imagesToDelete = project.images.filter((image) =>
      imageIds.includes(Number(image.id)),
    );

    if (imagesToDelete.length > 0) {
      // Delete images from Cloudinary
      for (const image of imagesToDelete) {
        await this.cloudinaryService.deleteImage(image.publicId);
      }

      // Remove associated project images
      await this.projectImageRepository.remove(imagesToDelete);
    }
  }
}
