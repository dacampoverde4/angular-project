import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changePassModalOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openChangePassModal() {
    this.changePassModalOpen = true;
  }

}
