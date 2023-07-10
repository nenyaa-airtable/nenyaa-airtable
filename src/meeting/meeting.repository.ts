import { Injectable } from '@nestjs/common';
import Airtable, { Base } from 'airtable';

@Injectable()
export class MeetingRepository {
  private base: Base;

  constructor() {
    this.base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);
  }

  async findAll(district?: number) {
    return (
      await this.base('Groups')
        .select({
          view: process.env.AIRTABLE_VIEW,
        })
        .all()
    ).filter((group) => {
      if (district) {
        return parseInt(group.get('District') as string) == district;
      }
      return true;
    });
  }
}
