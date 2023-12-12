import { Component, OnInit } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { EventsService } from './events.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  selectedTabIndex: number = 0;
  isSportModalOpen: boolean = false;
  isTourModalOpen: boolean = false;
  isMatchModalOpen: boolean = false;
  isBetModalOpen: boolean = false;

  fromDate: Date;
  dateConfig: IDatePickerConfig;

  eventsLists = [];
  activeGames =[];
  gameId: any;

  constructor(
    private eventsService: EventsService,
    private loadingService: LoadingService
    ) {
    this.dateConfig = {
      format: 'YYYY-MM-DD',
    };
  }

  ngOnInit(): void {
    this.getGameList();
    this.getActivateGame();
  }

  getGameList() {
    this.eventsLists = [];
    this.loadingService.setLoading(true);
    this.eventsService.listGame().subscribe((res: any) => {
      if (res && res.errorCode === 0) {
        this.eventsLists = res.result;
        this.loadingService.setLoading(false);
        console.log(this.eventsLists);
      }
    });
  }

  getActivateGame() {
    this.eventsLists = [];
    this.loadingService.setLoading(true);
    this.eventsService.activateListGame().subscribe((res: any) => {
       this.activeGames = res.result;
       this.loadingService.setLoading(false);
    });
  }

  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }

  toggleExpand(event, id: any) {
    let state = document.getElementById(id).style.display;
    if (state === 'none') {
      document.getElementById(id).style.display = 'table-row';
      event.target.className = 'expand-open';
    } else {
      document.getElementById(id).style.display = 'none';
      event.target.className = 'expand-close';
    }
  }

  toggleMarkets(event, id: any) {
    let state = document.getElementById(id).style.display;
    if (state === 'none') {
      document.getElementById(id).style.display = 'flex';
      event.target.className = 'expand-open';
    } else {
      document.getElementById(id).style.display = 'none';
      event.target.className = 'expand-close';
    }
  }

  toggleEventStatus(event) {
    let i = this.eventsLists.findIndex((e) => e.id === event.id);
    if (i > -1) {
      let event = this.eventsLists[i];
      if (event.status === 1) {
        this.eventsLists[i].status = 0;
      } else {
        this.eventsLists[i].status = 1;
      }
    }
  }

  openSportModal(event) {
    this.isSportModalOpen = true;
  }

  openTourModal(event) {
    this.isTourModalOpen = true;
  }

  openMatchModal(event) {
    this.isMatchModalOpen = true;
  }

  openBetModal(event) {
    this.isBetModalOpen = true;
  }

  changeGender(e) {
    this.gameId = e.target.value;
    this.eventsLists = [];
    this.loadingService.setLoading(true);
    this.eventsService.getGame(this.gameId).subscribe((res: any) => {
      if (res && res.errorCode === 0) {
        this.eventsLists = res.result;
        this.loadingService.setLoading(false);
        console.log(this.eventsLists);
      }
   });
  }

  onActiveGame() {
    const activeGameIds = this.eventsLists.filter(event => event.activeStatus).reduce((res, cur) => {
      return [
        ...res,
        ...cur.markets.map((m) => m.gameId)
      ]
    }, []);
    this.eventsService.activeGame(activeGameIds).subscribe((res: any) => {
      if (res && res.errorCode === 0) {
        this.getActivateGame();
      }
    });
  }
}
