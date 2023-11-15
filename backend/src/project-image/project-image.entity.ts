import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity({ name: 'project_images' })
export class ProjectImage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  imageUrl: string; // Assuming this column stores the URL of the image

  @Column()
  publicId: string; // Assuming this column stores the URL of the image

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;
}