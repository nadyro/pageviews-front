import {Component, OnInit} from '@angular/core';
import {StorageValues} from './models/StorageValues/StorageValues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pageviews-front';

  constructor() {
  }

  isLoggedIn = false;

  ngOnInit() {
    if (localStorage.getItem(StorageValues.localStorage.user)) {
      this.isLoggedIn = true;
    }
  }
}
