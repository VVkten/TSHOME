import { Test, TestingModule } from '@nestjs/testing';
import { AdPlacementService } from './ad-placement.service';

describe('AdPlacementService', () => {
  let service: AdPlacementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdPlacementService],
    }).compile();

    service = module.get<AdPlacementService>(AdPlacementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
