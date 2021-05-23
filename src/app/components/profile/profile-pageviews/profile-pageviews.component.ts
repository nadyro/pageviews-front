import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../../service/profile.service';
import {PageViews} from '../../../models/PageViews';
import {User} from '../../../models/User';
import {StorageValues} from '../../../models/StorageValues/StorageValues';
import {NgSelectComponent} from '@ng-select/ng-select';
import {DateTimeFormat} from '../../../models/DateTimeFormat';
import {PageviewsService} from '../../../service/pageviews.service';

@Component({
  selector: 'app-profile-pageviews',
  templateUrl: './profile-pageviews.component.html',
  styleUrls: ['./profile-pageviews.component.scss']
})
export class ProfilePageviewsComponent implements OnInit, AfterViewInit {

  constructor(private profileService: ProfileService, private pageViewService: PageviewsService) {
  }

  user: User;
  pageViews: PageViews[] = new Array<PageViews>();
  ngSelection: NgSelectComponent;
  arrayAllPagesByCountry = {};
  keys = [];
  countriesSelected = {};
  selectedKeys = [];
  endOfWrite = '';
  elementClicked;
  // @ts-ignore
  @ViewChild('selection') selection: ElementRef;

  getCountriesSelected(countries) {
    this.countriesSelected = countries;
  }

  getSelectedKeys(keys) {
    this.selectedKeys = keys;
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.ngSelection = this.selection.genericSelection;
  }

  getDeletionSignal(element) {
    const i = this.selectedKeys.indexOf(element);
    this.selectedKeys.splice(i, 1);
    delete this.countriesSelected[element];
    this.ngSelection.clearItem(element);
  }

  getDeletionSignalFromSelection(arrayDiff) {
    const i = this.selectedKeys.indexOf(arrayDiff);
    this.selectedKeys.splice(i, 1);
    delete this.countriesSelected[arrayDiff];
  }

  downloadPageView(pageview: PageViews, element: Element) {
    const dateTimeFormat = new DateTimeFormat();
    // pageviews-20210506-040000
    const tmpName = pageview.originalName.split('-');
    dateTimeFormat.year = tmpName[1][0] + tmpName[1][1] + tmpName[1][2] + tmpName[1][3];
    dateTimeFormat.month = tmpName[1][4] + tmpName[1][5];
    dateTimeFormat.day = tmpName[1][6] + tmpName[1][7];
    dateTimeFormat.hour = tmpName[2][0] + tmpName[2][1];
    dateTimeFormat.user = this.user;
    // @ts-ignore
    element.childNodes[1].childNodes[2].classList.add('displayed');
    this.pageViewService.downloadFile(dateTimeFormat, dateTimeFormat, true).subscribe(res => {
      // @ts-ignore
      element.childNodes[1].childNodes[2].classList.remove('displayed');
      if (res.pageviews) {
        this.profileService.getPageviews(this.user.id).subscribe(r => {
          if (r && r.status === 200) {
            this.pageViews = r.object;
          }
        });
      }
    });
  }
  fetchPageView(id: string, element) {
    if (this.elementClicked) {
      this.elementClicked.style.background = '#eef7ff';
    }
    this.elementClicked = element;
    this.elementClicked.style.background = 'white';
    this.keys = [];
    this.arrayAllPagesByCountry = {};
    this.selectedKeys = [];
    this.countriesSelected = {};
    this.endOfWrite = '';
    if (this.ngSelection) {
      this.ngSelection.items = [];
      this.ngSelection.itemsList.clearSelected();
      this.selectedKeys = [];
      this.countriesSelected = {};
    }
    this.profileService.fetchPageViewClicked(id).subscribe(res => {
      if (res.pageviews) {
        this.ngSelection.items = [];
        this.arrayAllPagesByCountry = res.pageviews;
        this.keys = Object.keys(res.pageviews);
        this.endOfWrite = this.keys.length.toString();
      }
    });
  }

  ngOnInit() {
    this.user = new User().createUser(JSON.parse(localStorage.getItem(StorageValues.localStorage.user)));
    this.profileService.getPageviews(this.user.id).subscribe(res => {
      if (res && res.status === 200) {
        this.pageViews = res.object;
      }
    });
  }

}
