import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  userId: string;
  hideMenu: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userID;
    this.hideMenu = ['toxiy', 'john00001', 'shank1122'].indexOf(this.userId) > -1;
    console.log(this.hideMenu, typeof this.userId);
  }

}
