import { Component, OnInit } from '@angular/core';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';

@Component({
  selector: 'app-pl-market',
  templateUrl: './pl-market.component.html',
  styleUrls: ['./pl-market.component.scss'],
})
export class PlMarketComponent implements OnInit {
  fromDate;
  toDate;

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
