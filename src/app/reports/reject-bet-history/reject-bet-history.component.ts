import { Component, OnInit } from '@angular/core';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';

@Component({
  selector: 'app-reject-bet-history',
  templateUrl: './reject-bet-history.component.html',
  styleUrls: ['./reject-bet-history.component.scss'],
})
export class RejectBetHistoryComponent implements OnInit {
  fromDate;
  toDate;

  dateConfig: IDayTimeCalendarConfig;
  constructor() {
    this.dateConfig = {
      format: 'YYYY-MM-DD',
    };
  }

  ngOnInit(): void {}
}
