import { Component, OnInit } from '@angular/core';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { MessagesService } from '../messages.service';
import { MessagesTicker, NewTickerResponse } from '../models/ticker.model';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements OnInit {

  isAddNewModalOpen = false;
  newTickerTitle = '';

  constructor(
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
  }

  openAddNewModal(): void {
    this.isAddNewModalOpen = true;
  }

  addTicker(): void {
    const newTicker: MessagesTicker = {
      ticker: btoa(this.newTickerTitle),
    };
    this.messagesService.createTicker(newTicker)
    .subscribe((res: GenericResponse<NewTickerResponse>) => {
      if (res.errorCode === 0) {
        this.isAddNewModalOpen = false;
        this.newTickerTitle = '';
      } else {
        alert(res.errorDescription);
      }
    });
  }
}
