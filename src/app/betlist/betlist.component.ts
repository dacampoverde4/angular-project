import { Component, OnInit } from '@angular/core';
import { IDayCalendarConfig } from 'ng2-date-picker';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';

@Component({
  selector: 'app-betlist',
  templateUrl: './betlist.component.html',
  styleUrls: ['./betlist.component.scss']
})
export class BetlistComponent implements OnInit {

  fromDate;
  fromTime;
  toDate;
  toTime;

  dateConfig: IDayTimeCalendarConfig;
  timeConfig: ITimeSelectConfig;
  constructor() {
    this.dateConfig = {
      format: 'YYYY-MM-DD',
    }

    this.timeConfig = {
      hours12Format: 'hh',
      showSeconds: false
    }
  }

  ngOnInit(): void {
  }

}
