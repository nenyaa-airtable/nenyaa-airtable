import { Controller, Get, Query } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller()
export class MeetingController {
  constructor(private readonly groupService: MeetingService) {}

  @Get()
  async findAll(@Query('district') district?: number) {
    return await this.groupService.findAll(district);
  }
}
