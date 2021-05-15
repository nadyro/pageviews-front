import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTimeFormat} from '../../models/DateTimeFormat';
import {PageviewsService} from '../../service/pageviews.service';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent implements OnInit {

  dateTimeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
  });
  hours = 24;
  arrayHours: Array<string> = new Array<string>();
  isLoading = false;
  @Output() arrayAllPagesByCountry: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() keys: EventEmitter<string[]> = new EventEmitter<string[]>();
  constructor(public pageviewsService: PageviewsService) { }

  onSubmit() {
    this.isLoading = true;
    const date = this.dateTimeForm.value.date;
    const hour = this.dateTimeForm.value.hour;
    const arrDate = date.split('-');
    const dateTimeFormat: DateTimeFormat = new DateTimeFormat(arrDate[0], arrDate[1], arrDate[2], hour);
    this.pageviewsService.uploadFile(dateTimeFormat).subscribe(res => {
      console.log(res);
      if (res) {
        this.arrayAllPagesByCountry.emit(res.pageviews);
        this.keys.emit(Object.keys(res.pageviews));
      }
      this.isLoading = false;
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
