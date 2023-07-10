import { Injectable } from '@nestjs/common';
import { MeetingRepository } from './meeting.repository';
import { Group } from './models/group.model';
import { Meeting } from './models/meeting.model';
import _ from 'lodash';

@Injectable()
export class MeetingService {
  constructor(private groupRepository: MeetingRepository) {}

  async findAll(district?: number) {
    const raw = await this.groupRepository.findAll(district);
    const groups = raw.map((group) => {
      return new Group(group.id, group.fields);
    });
    let meetings: Meeting[] = [];
    for (const group of groups) {
      const oldMeetings = [...meetings];
      meetings = [...oldMeetings, ...group.meetings];
    }
    return _.orderBy(
      meetings,
      ['day', 'region', 'time', 'name'],
      ['asc', 'asc', 'asc', 'asc'],
    );
  }
}
