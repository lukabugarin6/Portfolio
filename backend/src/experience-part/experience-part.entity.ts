import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';
import { Experience } from 'src/experience/experience.entity';

@Entity({ name: 'experience_parts' })
export class ExperiencePart {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string; // Assuming this column stores the URL of the image

  @Column()
  description: string; // Assuming this column stores the URL of the image

  @Column()
  createdAt: Date;

  @ManyToOne(() => Experience, (experience) => experience.experience_parts)
  experience: Experience;
}