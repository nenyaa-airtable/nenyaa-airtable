import { Meeting } from './meeting.model';
import { getNumbers, isNullOrWhitespace } from '../../util/string.util';
import { getMeetingTypeCode } from '../../util/get-meeting-type-code.util';
import { DayOfWeek, NameOfDay } from '../../util/day-of-week.util';
import { FieldSet } from 'airtable';
import slugify from 'slugify';

export class Group {
  public id: string;
  public groupName: string;
  public gsoNum: string;
  public fcNum: string;
  public location: string;
  public comments: string;
  public address: string;
  public city: string;
  public state: string;
  public county: string;
  public zip: string;
  public sundayTime: string;
  public sundayType: string[];
  public sundayNotes: string;
  public mondayTime: string;
  public mondayType: string[];
  public mondayNotes: string;
  public tuesdayTime: string;
  public tuesdayType: string[];
  public tuesdayNotes: string;
  public wednesdayTime: string;
  public wednesdayType: string[];
  public wednesdayNotes: string;
  public thursdayTime: string;
  public thursdayType: string[];
  public thursdayNotes: string;
  public fridayTime: string;
  public fridayType: string[];
  public fridayNotes: string;
  public saturdayTime: string;
  public saturdayType: string[];
  public saturdayNotes: string;
  public type: string;
  public district: string;
  public onlineMeetingsLink?: string;
  public onlineMeetingsId?: string;
  public onlineMeetingsPassword?: string;
  public onlineMeetingsPhoneNumber?: string;
  public onlineMeetingsPhoneNumberPassword?: string;
  public onlineContributionsLink?: string;
  public listingStatus: string;

  constructor(id: string, group: FieldSet) {
    this.id = id;
    this.groupName = group['Group Name'] as string;
    this.gsoNum = group['GSO #'] as string;
    this.fcNum = group['FC #'] as string;
    this.location = group['Location'] as string;
    this.comments = group['Comments'] as string;
    this.address = group['Address'] as string;
    this.city = group['City'] as string;
    this.state = group['State'] as string;
    this.county = group['County'] as string;
    this.zip = group['Zip'] as string;
    this.sundayTime = group['Sunday Time'] as string;
    this.sundayType = group['Sunday Type'] as string[];
    this.sundayNotes = group['Sunday Notes'] as string;
    this.mondayTime = group['Monday Time'] as string;
    this.mondayType = group['Monday Type'] as string[];
    this.mondayNotes = group['Monday Notes'] as string;
    this.tuesdayTime = group['Tuesday Time'] as string;
    this.tuesdayType = group['Tuesday Type'] as string[];
    this.tuesdayNotes = group['Tuesday Notes'] as string;
    this.wednesdayTime = group['Wednesday Time'] as string;
    this.wednesdayType = group['Wednesday Type'] as string[];
    this.wednesdayNotes = group['Wednesday Notes'] as string;
    this.thursdayTime = group['Thursday Time'] as string;
    this.thursdayType = group['Thursday Type'] as string[];
    this.thursdayNotes = group['Thursday Notes'] as string;
    this.fridayTime = group['Friday Time'] as string;
    this.fridayType = group['Friday Type'] as string[];
    this.fridayNotes = group['Friday Notes'] as string;
    this.saturdayTime = group['Saturday Time'] as string;
    this.saturdayType = group['Saturday Type'] as string[];
    this.saturdayNotes = group['Saturday Notes'] as string;
    this.type = group['Type'] as string;
    this.district = group['District'] as string;
    this.onlineMeetingsLink = group['Online Meetings Link'] as string;
    this.onlineMeetingsId = group['Online Meetings ID'] as string;
    this.onlineMeetingsPassword = group['Online Meetings Password'] as string;
    this.onlineMeetingsPhoneNumber = group[
      'Online Meetings Phone Number'
    ] as string;
    this.onlineMeetingsPhoneNumberPassword = group[
      'Online Meetings Phone Number Password'
    ] as string;
    this.onlineContributionsLink = group['Online Contributions Link'] as string;
    this.listingStatus = group['Listing Status'] as string;
  }

  public get meetings() {
    let list = [] as Meeting[];
    if (!this.isMeetingListable()) {
      return list;
    }

    list = this.addMeetingToList(
      NameOfDay.Sunday,
      DayOfWeek.Sunday,
      this.sundayTime,
      this.sundayNotes,
      this.sundayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Monday,
      DayOfWeek.Monday,
      this.mondayTime,
      this.mondayNotes,
      this.mondayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Tuesday,
      DayOfWeek.Tuesday,
      this.tuesdayTime,
      this.tuesdayNotes,
      this.tuesdayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Wednesday,
      DayOfWeek.Wednesday,
      this.wednesdayTime,
      this.wednesdayNotes,
      this.wednesdayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Thursday,
      DayOfWeek.Thursday,
      this.thursdayTime,
      this.thursdayNotes,
      this.thursdayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Friday,
      DayOfWeek.Friday,
      this.fridayTime,
      this.fridayNotes,
      this.fridayType,
      list,
    );

    list = this.addMeetingToList(
      NameOfDay.Saturday,
      DayOfWeek.Saturday,
      this.saturdayTime,
      this.saturdayNotes,
      this.saturdayType,
      list,
    );

    return list;
  }

  public get meetingId() {
    if (!isNullOrWhitespace(this.gsoNum) && !isNullOrWhitespace(this.fcNum)) {
      return `[GSO# ${this.gsoNum.trim()} | FC# ${this.fcNum.trim()}]`;
    } else if (
      isNullOrWhitespace(this.gsoNum) &&
      !isNullOrWhitespace(this.fcNum)
    ) {
      return `[FC# ${this.fcNum.trim()}]`;
    } else if (
      !isNullOrWhitespace(this.gsoNum) &&
      isNullOrWhitespace(this.fcNum)
    ) {
      return `[GSO# ${this.gsoNum.trim()}]`;
    } else {
      return '';
    }
  }

  public get meetingNotes() {
    if (
      this.onlineMeetingsId &&
      !isNullOrWhitespace(this.onlineMeetingsPassword)
    ) {
      return `${this.meetingId} [Online Meetings ID: ${this.onlineMeetingsId}, Password: ${this.onlineMeetingsPassword}]`;
    } else if (this.onlineMeetingsId) {
      return `${this.meetingId} [Online Meetings ID: ${this.onlineMeetingsId}]`;
    } else if (!isNullOrWhitespace(this.onlineMeetingsPassword)) {
      return `${this.meetingId} [Online Meetings Password: ${this.onlineMeetingsPassword}]`;
    } else {
      return this.meetingId;
    }
  }

  public get meetingPhoneNumber() {
    let phoneNumber = getNumbers(this.onlineMeetingsPhoneNumber);
    const meetingId = getNumbers(this.onlineMeetingsId);
    const password = getNumbers(this.onlineMeetingsPhoneNumberPassword);

    if (phoneNumber?.startsWith('1')) {
      phoneNumber = phoneNumber.slice(1);
    }
    phoneNumber = `+1${phoneNumber}`;

    if (
      !isNullOrWhitespace(this.onlineMeetingsPhoneNumber) &&
      !isNullOrWhitespace(this.onlineMeetingsId) &&
      !isNullOrWhitespace(this.onlineMeetingsPhoneNumberPassword)
    ) {
      return `${phoneNumber},,${meetingId}#,,#,${password}#`;
    } else if (
      !isNullOrWhitespace(this.onlineMeetingsPhoneNumber) &&
      !isNullOrWhitespace(this.onlineMeetingsId)
    ) {
      return `${phoneNumber},,${meetingId}#`;
    } else if (!isNullOrWhitespace(this.onlineMeetingsPhoneNumber)) {
      return phoneNumber;
    } else {
      return '';
    }
  }

  private getMeetingTypeCodes(types: string[]): string[] {
    return types.map((type) => getMeetingTypeCode(type));
  }

  private addMeetingToList(
    dayOfWeek: string,
    dayNumber: number,
    time: string,
    notes: string,
    type: string[],
    list: Meeting[],
  ): Meeting[] {
    let newList = [...list];
    if (!isNullOrWhitespace(time) && type?.length > 0) {
      newList.push({
        name: this.groupName.substring(0, 255),
        slug: `${slugify(this.groupName, {
          lower: true,
          strict: true,
        })}-${dayOfWeek}-${this.id}`,
        day: dayNumber,
        time: time,
        location: this.location || null,
        group: this.groupName,
        notes: `${this.meetingNotes} ${notes ?? ''}`.trim(),
        location_notes: this.comments || null,
        types: this.getMeetingTypeCodes(type),
        address: this.address || null,
        city: this.city || null,
        state: this.state || null,
        postal_code: this.zip || null,
        country: 'United States',
        region: this.county || null,
        district: `District ${this.district}`,
        conference_url: this.onlineMeetingsLink || null,
        conference_phone: this.meetingPhoneNumber || null,
        website: this.onlineContributionsLink || null,
        website_2: null,
        phone: null,
      } as Meeting);
    }
    return newList;
  }

  private isMeetingListable() {
    return (
      !isNullOrWhitespace(this.groupName) &&
      !isNullOrWhitespace(this.type) &&
      this.type !== 'Corr Facility' &&
      !isNullOrWhitespace(this.district) &&
      this.listingStatus === 'Listed'
    );
  }
}
