import { Test, TestingModule } from '@nestjs/testing';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './meeting.repository';

describe('MeetingService', () => {
  let service: MeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingService, MeetingRepository],
    }).compile();

    service = module.get<MeetingService>(MeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
