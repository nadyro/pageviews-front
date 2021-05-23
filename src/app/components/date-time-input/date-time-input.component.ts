import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTimeFormat} from '../../models/DateTimeFormat';
import {PageviewsService} from '../../service/pageviews.service';
import {SocketServiceService} from '../../service/socket-service.service';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent implements OnInit {

  dateTimeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    dateTo: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    hourTo: new FormControl('', [Validators.required]),
  });
  hours = 24;
  arrayHours: Array<string> = new Array<string>();
  arrayHoursTo: Array<string> = new Array<string>();

  showDateTo = false;
  showHourTo = false;
  isLoading = false;
  progressMessage = '';
  downloadProgress;
  isAnimatedProgressBar = true;
  dateTimeFormatFromStorage: DateTimeFormat;
  dateTimeToFormatFromStorage: DateTimeFormat;
  errorMessage;
  remarks = '';
  @Input() computingMessage;
  @Output() arrayAllPagesByCountry: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() keys: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onSubmitClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public pageviewsService: PageviewsService, public socketService: SocketServiceService) { }

  onSubmit() {
    this.errorMessage = undefined;
    this.isLoading = true;
    const date = this.dateTimeForm.value.date;
    const hour = this.dateTimeForm.value.hour;
    const dateTo = this.dateTimeForm.value.dateTo;
    const hourTo = this.dateTimeForm.value.hourTo;
    const arrDate = date.split('-');
    const arrDateTo = dateTo.split('-');
    const dateTimeFormat: DateTimeFormat = new DateTimeFormat(arrDate[0], arrDate[1], arrDate[2], hour, this.socketService.user);
    const dateTimeFormatTo: DateTimeFormat = new DateTimeFormat(arrDateTo[0], arrDateTo[1], arrDateTo[2], hourTo, this.socketService.user);
    this.onSubmitClicked.emit(true);
    this.pageviewsService.uploadFile(dateTimeFormat, dateTimeFormatTo, false).subscribe(res => {
      if (res && res.name) {
        this.downloadProgress = undefined;
        this.isLoading = false;
        this.errorMessage = res.name + ': File is not available.';
      } else if (res) {
        this.arrayAllPagesByCountry.emit(res.pageviews);
        this.keys.emit(Object.keys(res.pageviews));
        this.isLoading = false;
        this.downloadProgress = undefined;
        if (res.remarks) {
          this.remarks = res.remarks;
        }
      }
      this.downloadProgress = undefined;
      this.isLoading = false;
    });
  }
  ngOnInit() {
    this.dateTimeForm.valueChanges.subscribe(res => {
      this.showDateTo = res.date !== '';
      this.showHourTo = res.hour !== '';
      if (res.hour > res.hourTo && res.hourTo !== '') {
        this.dateTimeForm.controls.hourTo.patchValue('');
      }
      if (new Date(res.date) > new Date(res.dateTo) && res.dateTo !== '') {
        this.dateTimeForm.controls.dateTo.patchValue('');
      }
      this.arrayHoursTo = [];
      if (res.hour !== '') {
        let y = parseInt(res.hour, 10);
        while (y < this.hours) {
          let hourToString = '';
          if (y < 10) {
            hourToString = '0' + y.toString();
          } else {
            hourToString = y.toString();
          }
          this.arrayHoursTo.push(hourToString);
          y++;
        }
      }
    });
    this.dateTimeFormatFromStorage = new DateTimeFormat().createDateTimeFormat(0);
    this.dateTimeToFormatFromStorage = new DateTimeFormat().createDateTimeFormat(1);
    let dateTimeFormDate = '';
    let dateTimeToFormDate = '';
    if (this.dateTimeFormatFromStorage) {
      dateTimeFormDate = this.dateTimeFormatFromStorage ? this.dateTimeFormatFromStorage.year + '-' +
        this.dateTimeFormatFromStorage.month + '-' +
        this.dateTimeFormatFromStorage.day : '';
    }
    if (this.dateTimeToFormatFromStorage) {
      dateTimeToFormDate = this.dateTimeToFormatFromStorage ? this.dateTimeToFormatFromStorage.year + '-' +
        this.dateTimeToFormatFromStorage.month + '-' +
        this.dateTimeToFormatFromStorage.day : '';
    }
    this.dateTimeForm.patchValue({
      date: dateTimeFormDate,
      dateTo: dateTimeToFormDate,
      hour: this.dateTimeFormatFromStorage ? this.dateTimeFormatFromStorage.hour : '',
      hourTo: this.dateTimeToFormatFromStorage ? this.dateTimeToFormatFromStorage.hour : ''}
      );
    this.socketService.downloadProgressEventEmitter.subscribe(progress => {
      this.downloadProgress = progress;
      this.progressMessage = 'Downloading file...';
      if (this.downloadProgress.percent === 100) {
        this.isLoading = true;
      }
    });
    this.socketService.writeProgressEventEmitter.subscribe(progress => {
      this.progressMessage = progress;
      this.isAnimatedProgressBar = false;
      setTimeout(() => {
        this.progressMessage = 'Computing...';
      }, 5000);
    });
    this.pageviewsService.eventEmitterNotifier.subscribe(() => {
      this.isLoading = false;
      this.downloadProgress = undefined;
    });
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
