import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {ResponseStatus} from '../models/ResponseStatus';
import {map} from 'rxjs/operators';
import {SocketServiceService} from './socket-service.service';
import {EventTypes} from '../models/EventTypes/EventTypes';
import {StorageValues} from '../models/StorageValues/StorageValues';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private socket;
  public user: User;
  public isLoggedIn = false;
  constructor(public http: HttpClient, socketService: SocketServiceService) {
    this.socket = socketService.socket;
    this.socket.emit('connectFromLogin', 'fdp');
    this.user = this.getUser();
    if (this.user) {
      this.isLoggedIn = true;
    }
  }

  public getUser(): User {
    const userFromStorage = localStorage.getItem(StorageValues.localStorage.user);
    if (userFromStorage) {
      return new User().createUser(JSON.parse(userFromStorage));
    }
    return null;
  }
  public submitLogout() {
    const userToLogout = new User().createUser(JSON.parse(localStorage.getItem(StorageValues.localStorage.user)));
    return this.http.post<any>('http://localhost:3001/users/logout', userToLogout).pipe(map(res => {
      localStorage.removeItem(StorageValues.localStorage.user);
      sessionStorage.removeItem(StorageValues.sessionStorage.dateTimeInput);
      sessionStorage.removeItem(StorageValues.sessionStorage.endOfWrite);
      location.reload();
      return new ResponseStatus<User>(res._status, res._message, res._object);
    }));
  }
  public setLogin(responseStatus: ResponseStatus<User>) {
    if (responseStatus.object !== null) {
      localStorage.setItem(StorageValues.localStorage.user, JSON.stringify(responseStatus.object));
      this.user = this.getUser();
      this.isLoggedIn = true;
      this.socket.emit(EventTypes.login, responseStatus.object);
      location.reload();
    }
  }
  public submitLogin(userForm: User): Observable<ResponseStatus<User>> {
    return this.http.post<any>('http://localhost:3001/users/login', userForm).pipe(map(res => {
      const responseStatus: ResponseStatus<User> = new ResponseStatus<User>(res._status, res._message, res._object);
      this.setLogin(responseStatus);
      return responseStatus;
    }));
  }
  public submitSignIn(userForm: User): Observable<ResponseStatus<User>> {
    return this.http.post<any>('http://localhost:3001/users/saveUser', userForm).pipe(map(res => {
      const responseStatus: ResponseStatus<User> = new ResponseStatus<User>(res._status, res._message, res._object);
      this.setLogin(responseStatus);
      return responseStatus;
    }));
  }
}
