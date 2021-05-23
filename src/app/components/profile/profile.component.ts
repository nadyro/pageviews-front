import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {User} from '../../models/User';
import {StorageValues} from '../../models/StorageValues/StorageValues';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) {
  }

  profileRouteElement: Element;

  user: User;
  pageViewsLength;
  move(element: Element) {
    if (this.profileRouteElement) {
      this.profileRouteElement.classList.remove('active');
    }
    this.profileRouteElement = element;
    this.profileRouteElement.classList.add('active');
  }
  ngOnInit() {
    this.user = new User().createUser(JSON.parse(localStorage.getItem(StorageValues.localStorage.user)));
    this.profileService.eventEmitter.subscribe(res => {
      this.pageViewsLength = res;
    });
  }

}
