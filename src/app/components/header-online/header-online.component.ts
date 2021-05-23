import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {SocketServiceService} from '../../service/socket-service.service';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-header-online',
  templateUrl: './header-online.component.html',
  styleUrls: ['./header-online.component.scss']
})
export class HeaderOnlineComponent implements OnInit {

  user: User;
  constructor(private socketService: SocketServiceService, private loginService: LoginService) { }

  logout() {
    this.loginService.submitLogout().subscribe(() => {
    });
  }
  ngOnInit() {
    this.socketService.updateUserEmitter.subscribe(u => {
      this.user = u;
    });
  }

}
