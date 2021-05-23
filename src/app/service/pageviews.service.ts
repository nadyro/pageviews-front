import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DateTimeFormat} from '../models/DateTimeFormat';
import {Page} from '../models/Page';
import {EventTypes} from '../models/EventTypes/EventTypes';
import {SocketServiceService} from './socket-service.service';
import {User} from '../models/User';
import {StorageValues} from '../models/StorageValues/StorageValues';

@Injectable()
export class PageviewsService {

  public eventEmitter: EventEmitter<Page> = new EventEmitter<Page>();
  public eventEmitterOnEndOfComputing: EventEmitter<any> = new EventEmitter<any>();
  public eventEmitterNotifier: EventEmitter<any> = new EventEmitter<any>();
  public eventEmitterOnEndOfDownload: EventEmitter<any> = new EventEmitter<any>();

  private socket;
  private cancelRes = false;
  constructor(private http: HttpClient, socketService: SocketServiceService) {
    this.socket = socketService.socket;
    this.socket.on('disconnect', r => {
      console.log(r);
    });
    this.socket.on(EventTypes.fileData, data => {
      this.cancelRes = true;
      this.eventEmitter.emit(data);
    });

    this.socket.on(EventTypes.endOfWrite, () => {
      this.cancelRes = false;
      const dateTimeFormat: DateTimeFormat = new DateTimeFormat().createDateTimeFormat(0);
      const dateTimeFormatTo: DateTimeFormat = new DateTimeFormat().createDateTimeFormat(1);

      this.uploadFile(dateTimeFormat, dateTimeFormatTo, true).subscribe(res => {
        this.eventEmitterOnEndOfComputing.emit(res);
      });
    });
    this.socket.on(EventTypes.endOfDownload, () => {
      this.eventEmitterOnEndOfDownload.emit('3');
    });
  }

  public downloadFile(dateTimeFormat: DateTimeFormat, dateTimeFormatTo: DateTimeFormat, secondRequest: any): Observable<any> {
    const objToSend = {
      dateTimeFormat,
      dateTimeFormatTo,
      secondRequest
    };
    return this.http.post<any>('http://localhost:3001/pageviews/compute', objToSend).pipe(map(res => {
      return res;
    }));
  }
  public uploadFile(dateTimeFormat: DateTimeFormat, dateTimeFormatTo: DateTimeFormat, secondRequest?: boolean): Observable<any> {
    let user = localStorage.getItem(StorageValues.localStorage.user);
    if (user !== '' || user !== undefined || user) {
      user = JSON.parse(user);
      dateTimeFormat.user = new User().createUser(user);
      sessionStorage.setItem(StorageValues.sessionStorage.dateTimeInput, JSON.stringify(dateTimeFormat));
      sessionStorage.setItem(StorageValues.sessionStorage.dateTimeInputTo, JSON.stringify(dateTimeFormatTo));
      const objToSend = {
        dateTimeFormat,
        dateTimeFormatTo,
        secondRequest
      };
      return this.http.post<any>('http://localhost:3001/pageviews/compute', objToSend).pipe(map(res => {
        if (this.cancelRes === true) {
          return null;
        }
        return res;
      }));
    } else {
      return null;
    }
  }
}
