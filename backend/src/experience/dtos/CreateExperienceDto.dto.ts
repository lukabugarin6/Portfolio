import { CreateExperiencePartDto } from "src/experience-part/dtos/CreateExperiencePart.dto";

export class CreateExperienceDto {
    company: string;
    title: string;
    fromDate: Date;
    toDate: Date | "Present";
    experience_parts: CreateExperiencePartDto[];
  }