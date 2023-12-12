import { Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { BreadcrumbService } from 'angular-crumbs';
import { ToastrService } from 'ngx-toastr';
import { BankingService } from 'src/app/banking/banking.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { CreateUser } from '../../models/create-user.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss'],
})
export class SubComponent implements OnInit {

  @ViewChild('differentSharing') differentSharing: ElementRef;
  addMemberModalOpen: boolean = false;
  creditRefModalOpen: boolean = false;
  changeStatusOpen: boolean = false;
  showAddMemberButton: boolean = true;
  isDifferentSharingOpen: boolean = false;

  currentUser?: CurrentUser;
  userType?: number = 0;

  selectedUid: number = 0;
  selectedUser?: User;

  statusUser?: User;
  selectedStatus: 0 | 1 | 2;

  userRegForm: FormGroup;
  statusForm: FormGroup;

  userList = Array<User>();
  columns = [];

  creditRefForm: FormGroup;
  creditRefUser: User;

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

  statusMap = {
    0: 'Active',
    1: 'Suspend',
    2: 'Locked',
  };

  userTypeMap = {
    2: 'whitelabels',
    3: 'admins',
    4: 'subAdmins',
    5: 'superMasters',
    6: 'masters',
    7: 'agents',
    8: 'clients',
  };

  member = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private bankingService: BankingService
  ) {}

  ngOnInit(): void {
    this.selectedUid = 0;
    this.userType = 0;
    this.userRegForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      domain: [''],
      fullName: [''],
      creditRef: [0],
      sharePercent: [2, Validators.required],
    });

    this.statusForm = this.formBuilder.group({
      password: [, Validators.required],
    });

    this.creditRefForm = this.formBuilder.group({
      password: [, Validators.required],
      users: this.formBuilder.array([
        this.formBuilder.group({
          userId: [, Validators.required],
          txnType: [3],
          amount: [, Validators.required],
        }),
      ]),
    });

    this.currentUser = this.authService.currentUser;

    this.route.params.subscribe((params) => {
      this.userType = +params.userType;
      this.selectedUid = +params.selectedUid;

      // if (!this.userType) {
      //   this.userType = null;
      // }
      if (!this.selectedUid) {
        this.selectedUid = this.currentUser.userId;
      }

      if (this.userType === 2) {
        this.userRegForm.get('domain').setValidators([Validators.required]);
      } else {
        this.userRegForm.get('domain').setErrors(null);
        this.userRegForm.get('domain').clearValidators();
      }

      if (this.userType === 8) {
        // this.userRegForm.get('sharePercent').setValidators([])
        this.userRegForm.get('sharePercent').setValue(0);
      }
      this.member = this.memberMap[this.userType];
      if (this.selectedUid === this.currentUser.userId) {
        this.listUsers(this.currentUser.userId, this.userType);
      } else {
        this.listUsers(this.selectedUid);
      }
    });
  }

  get usersArray() {
    return this.creditRefForm.get('users') as FormArray;
  }

  register() {
    if (this.userRegForm.valid) {
      let user = <CreateUser>this.userRegForm.value;
      user.userType = this.userType;
      user.currencyId = 1;
      this.usersService.registration(user).subscribe((res: any) => {
        console.log(res);
        if (res && res.errorCode === 0) {
          this.addMemberModalOpen = false;
          this.toastr.success('User Created');
          this.listUsers(this.selectedUid, this.userType);
          this.userRegForm.reset();
        }
      });
    } else {
      this.toastr.error('Invalid Input');
    }
    console.log(this.userRegForm);
  }

  listUsers(selectedUid: number, userType?) {
    this.loadingService.setLoading(true);
    this.usersService
      .listUser(selectedUid, userType)
      .subscribe((res: GenericResponse<User[]>) => {
        this.userList = res.result;
        this.loadingService.setLoading(false);
      });
  }

  transferCreditRef() {
    console.log(this.creditRefForm.value);

    if (this.creditRefForm.valid) {
      console.log(this.creditRefForm.value);
      this.bankingService
        .transfer(this.creditRefForm.value)
        .subscribe((res: GenericResponse<any>) => {
          console.log(res);
          if (res.errorCode === 0) {
            this.toastr.success('Credit Updated');
            this.listUsers(this.selectedUid, this.userType);
            this.creditRefModalOpen = false;
            this.resetCreditForm();
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    }
  }

  pushDataToRoute(data: { userType: number; userName: string }) {
    history.pushState({ data }, '');
  }

  toggleAddMemberModal() {
    this.addMemberModalOpen = true;
    this.differentSharing.nativeElement.checked = false;
    this.showDifferentSharing(false);
  }

  openCreditRefModal(user: User) {
    this.creditRefUser = user;
    this.usersArray.controls.forEach((control) => {
      control.get('userId').setValue(user.userId);
    });
    this.creditRefModalOpen = true;
  }

  resetCreditForm() {
    this.usersArray.controls.forEach((control) => {
      control.get('amount').reset();
    });
    this.creditRefForm.get('password').reset();
  }

  openChangeStatusModal(user: User) {
    this.statusUser = user;
    this.changeStatusOpen = true;
  }

  selectStatus(event: Event, status: 0 | 1 | 2) {
    if (this.statusUser.userStatus !== status) {
      (<HTMLButtonElement>event.target).classList.add('open');
      this.selectedStatus = status;
    }
  }

  changeStatus() {
    if (this.statusForm.valid && this.selectedStatus !== null) {
      let changeStatus = this.statusForm.value;
      changeStatus.userStatus = this.selectedStatus;
      this.usersService
        .updateStatus(this.statusUser.userId, changeStatus)
        .subscribe((res: GenericResponse<any>) => {
          console.log(res);
          if (res && res.errorCode === 0) {
            this.changeStatusOpen = false;
            this.toastr.success('Changed status successfully');
            this.listUsers(this.selectedUid, this.userType);
            this.selectedStatus = null;
            this.statusForm.reset();
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    } else {
      console.log(this.statusForm);

      this.toastr.error('Invalid Input');
    }
  }

  resetStatusModal() {
    this.selectedStatus = null;
    this.statusForm.reset();
  }

  showBalanceDetail(user) {
    // let el = document.getElementById(`tempBalanceTr_${user}`);
    // console.log(el.style.display);
    // if (el.style.display === 'none') {
    //   el.style.display = 'table-row';
    // } else {
    //   el.style.display = 'none';
    // }
    user.showBalance = !user.showBalance;
  }

  showDifferentSharing(value) {
    console.log(value);

    this.isDifferentSharingOpen = value;
    if (value) {
      this.addDifferentSharing();
      this.removeDefaultSharing();
    } else {
      this.addDefaultSharing();
      this.removeDifferentSharing();
    }
  }

  addDifferentSharing() {
    this.userRegForm.addControl('cricketSharing', this.formBuilder.control(0));
    this.userRegForm.addControl(
      'cricketFancySharing',
      this.formBuilder.control(0)
    );
    this.userRegForm.addControl('soccerSharing', this.formBuilder.control(0));
    this.userRegForm.addControl(
      'soccerGoalsSharing',
      this.formBuilder.control(0)
    );
    this.userRegForm.addControl('bmCommission', this.formBuilder.control(0));
    this.userRegForm.addControl(
      'indianCasinoSharing',
      this.formBuilder.control(0)
    );
    this.userRegForm.updateValueAndValidity();
  }

  removeDifferentSharing() {
    this.userRegForm.removeControl('cricketSharing');
    this.userRegForm.removeControl('cricketFancySharing');
    this.userRegForm.removeControl('soccerSharing');
    this.userRegForm.removeControl('soccerGoalsSharing');
    this.userRegForm.removeControl('bmCommission');
    this.userRegForm.removeControl('indianCasinoSharing');
    this.userRegForm.updateValueAndValidity();
  }

  addDefaultSharing() {
    this.userRegForm.addControl('sharePercent', new FormControl(2, Validators.required))
    this.userRegForm.updateValueAndValidity();
  }

  removeDefaultSharing() {
    this.userRegForm.removeControl('sharePercent');
    this.userRegForm.updateValueAndValidity();
  }

  trackBy(index, item: User) {
    return item.userId;
  }
}
