import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExperiencePart } from 'src/experience-part/experience-part.entity';

@Entity({ name: 'experiences' })
export class Experience {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  company: string;

  @Column()
  title: string;

  @Column()
  fromDate: Date;

  @Column({ type: 'varchar', nullable: true })
  toDate: Date | string;

  @Column()
  createdAt: Date;

  @OneToMany(() => ExperiencePart, (experience_part) => experience_part.experience)
  experience_parts: ExperiencePart[];
}