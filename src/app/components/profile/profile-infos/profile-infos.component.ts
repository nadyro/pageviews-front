import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {StorageValues} from '../../../models/StorageValues/StorageValues';

@Component({
  selector: 'app-profile-infos',
  templateUrl: './profile-infos.component.html',
  styleUrls: ['./profile-infos.component.scss']
})
export class ProfileInfosComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
    this.user = new User().createUser(JSON.parse(localStorage.getItem(StorageValues.localStorage.user)));
  }

}
