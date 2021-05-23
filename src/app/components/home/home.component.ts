import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageviewsService} from '../../service/pageviews.service';
import {Page} from '../../models/Page';
import {Pages} from '../../models/Pages';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  arrayAllPagesByCountry = {};
  keys = [];
  arrayPages: Page[] = new Array<Page>();
  countriesSelected = {};
  selectedKeys = [];
  ngSelection: NgSelectComponent;
  computingMessage;
  endOfWrite = '';
  constructor(public pageviewsService: PageviewsService) {
  }
  // @ts-ignore
  @ViewChild('selection') selection: ElementRef;

  getOnSubmitClickedEvent() {
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
  }
  getArrayAllPagesByCountry(a) {
    this.arrayAllPagesByCountry = a;
  }
  getKeys(keys) {
    this.keys = keys;
  }
  getCountriesSelected(countries) {
    this.countriesSelected = countries;
  }
  getSelectedKeys(keys) {
    this.selectedKeys = keys;
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

  ngAfterViewInit() {
    // @ts-ignore
    this.ngSelection = this.selection.genericSelection;
  }

  ngOnInit() {
    this.pageviewsService.eventEmitter.subscribe(res => {
      let totalViews = 0;
      this.arrayPages = res.map((d) => {
        const pagesByCountry: Pages = new Pages();
        pagesByCountry.pagesByCountry = new Array<Page>();
        totalViews += parseInt(d.views, 10);
        const page = new Page(d.country, d.blacklisted, d.name, d.views, d.responseSize);
        pagesByCountry.pagesByCountry.push(page);
        pagesByCountry.country = page.country;
        return pagesByCountry;
      });
      this.arrayAllPagesByCountry[this.arrayPages[0].country] = {};
      this.arrayAllPagesByCountry[this.arrayPages[0].country].pages = this.arrayPages;
      this.arrayAllPagesByCountry[this.arrayPages[0].country].totalViews = totalViews;
      totalViews = 0;
      this.keys = Object.keys(this.arrayAllPagesByCountry);
    });
    this.pageviewsService.eventEmitterOnEndOfComputing.subscribe(res => {
      this.ngSelection.items = [];
      this.arrayAllPagesByCountry = res.pageviews;
      this.keys = Object.keys(res.pageviews);
      this.endOfWrite = this.keys.length.toString();
      this.pageviewsService.eventEmitterNotifier.emit('end');
    });
  }

}
