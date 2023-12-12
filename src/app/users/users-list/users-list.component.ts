import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
// import { BreadcrumbService } from 'angular-crumbs';
import { BreadcrumbsService } from "@exalif/ngx-breadcrumbs";
import { BreadcrumbService } from 'angular-crumbs';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { CreateUser } from '../models/create-user.model';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  addMemberModalOpen: boolean = false;
  creditRefModalOpen: boolean = false;
  changeStatusOpen: boolean = false;
  showAddMemberButton: boolean = true;

  currentUser?: CurrentUser;
  userType: number = 0;

  selectedUid: number = 0;

  userRegForm: FormGroup;

  userList = Array<User>();
  crumbs = [];
  public userData = {
    currencyTypeName: 'PTH',
    currencySymbol: '',
    totalBalance: 472.72,
    mastersBalance: 227.28,
    mastersAvailBal: 227.28,
    directUserType: 3,
    myCreditLimit: 22824.33,
    totalCreditGivenOut: 22597.05,
    myCreditAvailBal: 227.28,
    userLevel: 4,
  };

  memberMap = {
    2: 'Whitelabel',
    3: 'Admin',
    4: 'Sub Admin',
    5: 'Super Master',
    6: 'Master',
    7: 'Agent',
    8: 'Client',
  };

  member = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    private breadcrumbs: BreadcrumbService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.userRegForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      domain: [''],
      fullName: [''],
      creditRef: [0],
      sharePercent: [2, Validators.required],
    });

    // this.currentUser = this.authService.currentUser;

    // this.route.params.subscribe((params) => {
    //   this.userType = +params.userType;
    //   this.selectedUid = +params.selectedUid;

    //   if (!this.userType) {
    //     this.userType = this.currentUser.userType + 1;
    //   }
    //   if (!this.selectedUid) {
    //     this.selectedUid = this.currentUser.userId;
    //   }

    //   if (this.userType === 2) {
    //     this.userRegForm.get('domain').setValidators([Validators.required])
    //   }

    //   if(this.userType === 8) {
    //     // this.userRegForm.get('sharePercent').setValidators([])
    //     this.userRegForm.get('sharePercent').setValue(0);
    //   }
    //   this.member = this.memberMap[this.userType];
    //   this.listUsers(this.selectedUid, this.userType);


    //   console.log(this.selectedUid, this.userType);
    // });
    // this.route.url.subscribe((d) => {
    //   console.log(d);
    // });

    // this.breadcrumbsService.changeBreadcrumb(this.route.snapshot, history.state);
    this.ngZone.run(() => {
      this.breadcrumbs.breadcrumbChanged.subscribe(() => {})
    })

  }

  log(a: any) {
    console.log(a);

  }

  // register() {
  //   if (this.userRegForm.valid) {
  //     let user = <CreateUser>this.userRegForm.value;
  //     user.userType = this.userType;
  //     user.currencyId = 1;
  //     this.usersService.registration(user)
  //       .subscribe((res: any) => {
  //         console.log(res);
  //         if (res && res.errorCode === 0) {
  //           this.addMemberModalOpen = false;
  //           this.toastr.success("User Created");
  //           this.listUsers(this.selectedUid, this.userType);
  //           this.userRegForm.reset();
  //         }
  //       })
  //   } else {
  //     this.toastr.error("Invalid Input");
  //   }
  //   console.log(this.userRegForm);
  // }

  // listUsers(selectedUid: number, userType) {
  //   this.usersService.listUser(selectedUid, userType)
  //   .subscribe((res: GenericResponse<User[]>) => {
  //     this.userList = res.result;
  //   })
  // }

  // toggleAddMemberModal() {
  //   this.addMemberModalOpen = true;
  // }

  // openCreditRefModal() {
  //   this.creditRefModalOpen = true;
  // }

  // openChangeStatusModal() {
  //   this.changeStatusOpen = true;
  // }

  // showBalanceDetail(user) {
  //   user.showBalance = !user.showBalance;
  // }

  // openNextLevel(userID: number, userLevel: number) {

  // }

  trackBy(index, item) {
    return index;
  }
}
