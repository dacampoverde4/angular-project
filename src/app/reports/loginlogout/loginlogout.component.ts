import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginlogout',
  templateUrl: './loginlogout.component.html',
  styleUrls: ['./loginlogout.component.scss']
})
export class LoginlogoutComponent implements OnInit {
  selectedTabIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }

}
