import { Component, OnInit } from '@angular/core';
import {PageviewsService} from '../../service/pageviews.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTimeFormat} from '../../models/DateTimeFormat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authLoginForm = new FormGroup({
    date: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
  });
  hours = 24;
  arrayHours: Array<string> = new Array<string>();
  constructor(public pageviewsService: PageviewsService) { }

  onSubmit() {
    console.log(this.authLoginForm.value);
    const date = this.authLoginForm.value.date;
    const hour = this.authLoginForm.value.hour;
    const arrDate = date.split('-');
    const dateTimeFormat: DateTimeFormat = new DateTimeFormat(arrDate[0], arrDate[1], arrDate[2], hour);
    this.pageviewsService.uploadFile(dateTimeFormat).subscribe(res => {
      console.log('subscribed and received');
    });
  }
  ngOnInit() {
    let i = 0;
    while (i < this.hours) {
      let hourToString = '';
      if (i < 10) {
        hourToString = '0' + i.toString();
      } else {
        hourToString = i.toString();
      }
      this.arrayHours.push(hourToString);
      i++;
    }
  }

}
