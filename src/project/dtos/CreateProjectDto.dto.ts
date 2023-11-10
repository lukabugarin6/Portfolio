export class CreateProjectDto {
  title: string;
  slug: string;
  overview: string;
  contributions: string;
  githubUrl: string;
  liveUrl: string;
  span: number;
  createdAt: Date;
}