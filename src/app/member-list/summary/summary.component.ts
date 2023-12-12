import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  userID: any;

  changePassModalOpen: boolean = false;
  changeCommisionOpen: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userID = this.route.parent.snapshot.params.userID;
    console.log(this.userID);
  }

  openChangePassModal() {
    this.changePassModalOpen = true;
  }

  openChangeCommissionModal() {
    this.changeCommisionOpen = true;
  }
}
