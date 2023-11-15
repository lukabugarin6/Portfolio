import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencePartService } from './experience-part.service';

describe('ExperiencePartService', () => {
  let service: ExperiencePartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperiencePartService],
    }).compile();

    service = module.get<ExperiencePartService>(ExperiencePartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
