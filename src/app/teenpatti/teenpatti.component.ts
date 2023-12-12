import { Component, OnInit } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../shared/models/current-user';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { ToastrService } from 'ngx-toastr';
import { GenericResponse } from '../shared/types/generic-response';
import { TeenpattiService } from './teenpatti.service';

@Component({
  selector: 'app-teenpatti',
  templateUrl: './teenpatti.component.html',
  styleUrls: ['./teenpatti.component.scss'],
})
export class TeenpattiComponent implements OnInit {

  selectedTabIndex: number = 0;
  selectedUser: string = '';
  currentUser: CurrentUser;
  usersList: User[];
  teenpattiLists = [];
  activeTeenpattis = [];

  constructor(
    private teenpattiService: TeenpattiService,
    private usersService: UsersService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getTeenpattiList();
    this.listUser();
    this.getActivateTeenpattiList();
    this.currentUser = this.auth.currentUser;
  }

  getTeenpattiList() {
    this.teenpattiLists = [];
    this.loadingService.setLoading(true);
    this.teenpattiService.listTeenpatti(this.auth.currentUser.userId).subscribe((res: any) => {
      if (res && res.errorCode === 0) {
        this.teenpattiLists = res.result.reduce((obj, cur) => {
          return {
            ...obj,
            ...cur
          }

        }, {});
        this.loadingService.setLoading(false);
      }
    });
  }

  listUser() {
    this.usersService
      .listUser(this.auth.currentUser.userId)
      .subscribe((res: GenericResponse<User[]>) => {
        if (res.errorCode === 0) {
          this.usersList = res.result;
          this.loadingService.setLoading(false);
        }
      });
  }

  getActivateTeenpattiList() {
    this.activeTeenpattis = [];
    this.loadingService.setLoading(true);
    this.teenpattiService.activateListTeenpatti().subscribe((res: any) => {
       this.activeTeenpattis = res.result;
       this.loadingService.setLoading(false);
    });
  }

  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }

  onActiveCasino() {
    if (this.selectedUser && Object.keys(this.teenpattiLists).filter((t) => this.teenpattiLists[t]).length > 0) {
      const params = {
        userId: this.selectedUser,
        tables: Object.keys(this.teenpattiLists).filter((t) => this.teenpattiLists[t])
      }

      this.teenpattiService.activeCasino(params).subscribe((res: any) => {
          if (res.errorCode === 0) {
            this.toastr.success("Tables Updated");
            this.loadingService.setLoading(false);
          }
      });
    } else {
      this.toastr.error("Please select table and User");
    }
  }
}
