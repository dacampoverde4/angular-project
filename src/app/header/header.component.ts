import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { CurrentUser } from '../shared/models/current-user';
import { Hierarchy } from '../shared/types/hierarchy';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dateTime: Date;
  currentUser?: CurrentUser;
  hierarchyList: Hierarchy[];
  showMenu: boolean = false;
  constructor(
    public router: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private toastr: ToastrService,
    private common: CommonService
  ) {
    this.dateTime = new Date();
  }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.dateTime = new Date();
    });

    this.currentUser = this.authService.currentUser;
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });

    if (this.currentUser.userType === 2 || this.currentUser.userType === 1) {
      this.showMenu = true;
    }

    console.log(this.currentUser);
    this.common.heirarcyList$.subscribe((list) => {
      this.hierarchyList = list;
    });
  }

  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logout();
    this.toastr.success('Logged Out Successfully');
  }
}
