import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DateTimeFormat} from '../models/DateTimeFormat';
import {io} from 'socket.io-client';
import {Page} from '../models/Page';

@Injectable()
export class PageviewsService {

  public eventEmitter: EventEmitter<Page> = new EventEmitter<Page>();
  private socket;
  private cancelRes = false;
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3001/');
    this.socket.on('fdp', (d) => {
      console.log(d);
    });
    this.socket.on('fileData', data => {
      this.cancelRes = true;
      this.eventEmitter.emit(data);
    });
    this.socket.on('reception', d => {
      console.log(d);
    });
  }

  public uploadFile(dateTimeFormat: DateTimeFormat): Observable<any> {
    this.socket.emit('input', JSON.stringify(dateTimeFormat));
    return this.http.post<any>('http://localhost:3001/pageviews/test', dateTimeFormat).pipe(map(res => {
      if (this.cancelRes === true) {
        return null;
      }
      return res;
    }));
  }
}
