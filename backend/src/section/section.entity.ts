import { SectionImage } from 'src/section-image/section-image.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'sections' })
export class Section {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ type: 'text' })
  paragraph: string;

  @Column()
  identifier: string;

  @Column()
  createdAt: Date;

  @OneToOne(() => SectionImage, (image) => image.section)
  image: SectionImage;
}
