import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin = 0;
  goToLoginEvent(event) {
    this.isLogin = parseInt(event, 10);
  }
  constructor() { }

  ngOnInit() {
  }

}
