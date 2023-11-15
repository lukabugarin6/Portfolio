import { UpdateExperiencePartDto } from "src/experience-part/dtos/UpdateExperiencePart.dto";

export class UpdateExperienceDto {
    company?: string;
    title?: string;
    fromDate?: Date;
    toDate?: Date | "Present";
    experience_parts?: UpdateExperiencePartDto[];
  }