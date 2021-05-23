import {EventEmitter, Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {EventTypes} from '../models/EventTypes/EventTypes';
import {StorageValues} from '../models/StorageValues/StorageValues';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  public socket;
  public user;
  public updateUserEmitter: EventEmitter<User> = new EventEmitter<User>();
  public downloadProgressEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  public writeProgressEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.socket = io('http://localhost:3001/', {transports: ['websocket']});
    let user: string = localStorage.getItem(StorageValues.localStorage.user);
    if (user !== '' || user !== undefined || user) {
      user = JSON.parse(user);
      this.user = user;
      this.socket.emit(EventTypes.updateSocketId, this.user);
    }

    this.socket.on(EventTypes.writingDone, w => {
      this.writeProgressEventEmitter.emit(w);
    });
    this.socket.on(EventTypes.downloadProgress, p => {
      this.downloadProgressEventEmitter.emit(p);
    });
    this.socket.on(EventTypes.reconnectionSocket, s => {
      user = localStorage.getItem(StorageValues.localStorage.user);
      if (user !== '' && user !== undefined && user !== null) {
        user = JSON.parse(user);
        this.user = user;
        this.user._socketId = s;
        localStorage.setItem(StorageValues.localStorage.user, JSON.stringify(this.user));
      }
    });
    this.socket.on(EventTypes.socketIdUpdated, u => {
      this.user = new User().createUser(u);
      this.updateUserEmitter.emit(this.user);
      localStorage.setItem(StorageValues.localStorage.user, JSON.stringify(u));
    });
  }
}
