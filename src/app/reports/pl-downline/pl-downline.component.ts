import { Component, OnInit } from '@angular/core';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';

@Component({
  selector: 'app-pl-downline',
  templateUrl: './pl-downline.component.html',
  styleUrls: ['./pl-downline.component.scss'],
})
export class PlDownlineComponent implements OnInit {
  fromDate;
  fromTime;
  toDate;
  toTime;

  dateConfig: IDayTimeCalendarConfig;
  timeConfig: ITimeSelectConfig;
  constructor() {
    this.dateConfig = {
      format: 'YYYY-MM-DD',
    };

    this.timeConfig = {
      hours12Format: 'hh',
      showSeconds: false,
    };
  }
  ngOnInit(): void {}
}
