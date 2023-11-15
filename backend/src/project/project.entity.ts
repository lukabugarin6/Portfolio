import { ProjectImage } from 'src/project-image/project-image.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  stack: string;

  @Column({ length: 1000, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  overview: string;

  @Column({ length: 1000, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  contributions: string;

  @Column()
  githubUrl: string;

  @Column()
  liveUrl: string;

  @Column()
  span: number;

  @OneToMany(() => ProjectImage, (image) => image.project, { cascade: true })
  images: ProjectImage[];

  @Column()
  createdAt: Date;
}
