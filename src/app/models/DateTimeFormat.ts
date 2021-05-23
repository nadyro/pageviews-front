import {User} from './User';
import {StorageValues} from './StorageValues/StorageValues';

export class DateTimeFormat {
  year: string;
  month: string;
  day: string;
  hour: string;
  user: User;


  constructor(year?: string, month?: string, day?: string, hour?: string, user?: User) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.user = user;
  }
  createDateTimeFormat(which: number): DateTimeFormat {
    let dateTimeInputStorage;
    if (which === 0) {
      dateTimeInputStorage = sessionStorage.getItem(StorageValues.sessionStorage.dateTimeInput);
    } else {
      dateTimeInputStorage = sessionStorage.getItem(StorageValues.sessionStorage.dateTimeInputTo);
    }
    if (dateTimeInputStorage) {
      const dateTimeFormatObject = JSON.parse(dateTimeInputStorage);
      const userFromDateFormat: User = new User().createUser(dateTimeFormatObject.user);
      return new DateTimeFormat(
        dateTimeFormatObject.year,
        dateTimeFormatObject.month,
        dateTimeFormatObject.day,
        dateTimeFormatObject.hour,
        userFromDateFormat);
    }
    return null;
  }
}
