import { Component, OnInit } from '@angular/core';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';

@Component({
  selector: 'app-reportbet',
  templateUrl: './reportbet.component.html',
  styleUrls: ['./reportbet.component.scss'],
})
export class ReportbetComponent implements OnInit {
  fromDate;
  toDate;

  dateConfig: IDayTimeCalendarConfig;

  isBookModalOpen = false;
  isRejectBetModalOpen = false;
  constructor() {
    this.dateConfig = {
      format: 'YYYY-MM-DD',
    };
  }

  ngOnInit(): void {}

  openBookModel() {
    this.isBookModalOpen = true;
  }

  openRejectBetModal() {
    this.isRejectBetModalOpen = true;
  }
}
