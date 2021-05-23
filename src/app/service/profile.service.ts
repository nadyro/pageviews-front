import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageViews} from '../models/PageViews';
import {map} from 'rxjs/operators';
import {ResponseStatus} from '../models/ResponseStatus';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient) {
  }

  public getPageviews(userId): Observable<ResponseStatus<PageViews[]>> {
    return this.http.get<any>('http://localhost:3001/pageviews/pageviews?userId=' + userId).pipe(map(res => {
      let pageViews: PageViews[] = new Array<PageViews>();
      if (res && res._object) {
        pageViews = res._object.map(o => {
          const newDate = new Date(o._dateRegistered).toDateString();
          const dateTime = o._dateRegistered.split('T');
          const nameSplit = o._name.split('-');
          const dateQueried = nameSplit[1][0] + nameSplit[1][1] + nameSplit[1][2] + nameSplit[1][3] + '-'
            + nameSplit[1][4] + nameSplit[1][5] + '-' + nameSplit[1][6] + nameSplit[1][7];
          const dateQueriedToString = new Date(dateQueried).toDateString();
          const hour = nameSplit[2][0] + nameSplit[2][1];
          const dateTimeOnly = dateTime[1].split('.')[0];
          const pageView: PageViews = new PageViews();
          pageView.originalName = o._name;
          pageView.name = dateQueriedToString + ' at ' + hour;
          pageView.userId = o._userId;
          pageView.dateModified = o._dateModified;
          pageView.dateRegistered = o._dateRegistered;
          pageView.dateToDisplay = newDate + ' at ' + dateTimeOnly;
          pageView.isAvailable = o._isAvailable;
          pageView.id = o._id;
          return pageView;
        });
      }
      this.eventEmitter.emit(pageViews.length);
      return new ResponseStatus<PageViews[]>(res._status, res._message, pageViews.length > 0 ? pageViews : null);
    }));
  }
  public fetchPageViewClicked(pageViewId): Observable<any> {
    return this.http.get<any>('http://localhost:3001/pageviews/pageview?pageviewId=' + pageViewId).pipe(map(res => {
      return res;
    }));
  }
}
