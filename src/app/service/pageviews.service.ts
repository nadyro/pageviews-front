import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DateTimeFormat} from '../models/DateTimeFormat';

@Injectable()
export class PageviewsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public uploadFile(dateTimeFormat: DateTimeFormat): Observable<any> {
    return this.http.post<any>('http://localhost:3001/pageviews/test', dateTimeFormat).pipe(map(res => {
      return res;
    }));
  }
}
