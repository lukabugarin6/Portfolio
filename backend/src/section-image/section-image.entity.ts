import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from 'src/section/section.entity';

@Entity({ name: 'section_images' })
export class SectionImage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  imageUrl: string; // Assuming this column stores the URL of the image

  @Column()
  publicId: string; // Assuming this column stores the URL of the image

  @OneToOne(() => Section, (section) => section.image, { cascade: true })
  @JoinColumn()
  section: Section;
}
