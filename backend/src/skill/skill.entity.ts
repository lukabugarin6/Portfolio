import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  createdAt: Date;
}
