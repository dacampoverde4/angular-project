import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downline-list',
  templateUrl: './downline-list.component.html',
  styleUrls: ['./downline-list.component.scss'],
})
export class DownlineListComponent implements OnInit {
  addMemberModalOpen: boolean = false;
  creditRefModalOpen: boolean = false;
  changeStatusOpen: boolean = false;
  showAddMemberButton: boolean = true;

  userList = [];
  userData;

  demoUsers1? = [
    {
      userID: 'john00001',
      site: 1,
      siteLogo: 'Skysports365',
      fullName: 'john Mark',
      email: 'russell@gmail.com',
      currencyType: 'PTH',
      userType: 'MA',
      paymentMode: 1,
      userCSSName: 'lv_3',
      userShowCode: 'MA',
      balance: 10,
      playerBalance: 0,
      creditLimit: 0,
      creditRef: 0,
      creditOut: 0,
      creditPL: 0,
      accountRebate: 0,
      status: 'Active',
      isLocked: 0,
      userLevel: 3,
      isSuspended: 0,
      isSystemLocked: 0,
      isSystemSuspended: 0,
      isMaxWinSuspended: 0,
      isMaxLossSuspended: 0,
      isPassLock: 0,
      isFromApi: false,
      showBalance: false
    },
    {
      userID: 'shank1122',
      site: 1,
      siteLogo: 'Skysports365',
      fullName: ' ',
      email: 'xyz@gmail.com',
      currencyType: 'PTH',
      userType: 'MA',
      paymentMode: 1,
      userCSSName: 'lv_3',
      userShowCode: 'MA',
      balance: 400,
      playerBalance: 300,
      creditLimit: 22597.05,
      creditRef: 100,
      creditOut: 22497.05,
      creditPL: 22597.05,
      accountRebate: 0,
      status: 'Active',
      isLocked: 0,
      userLevel: 3,
      isSuspended: 0,
      isSystemLocked: 0,
      isSystemSuspended: 0,
      isMaxWinSuspended: 0,
      isMaxLossSuspended: 0,
      isPassLock: 0,
      isFromApi: false,
      showBalance: false
    },
    {
      userID: 'toxiy',
      site: 1,
      siteLogo: 'Skysports365',
      fullName: 'toxiy peter',
      email: 'toxiy56247@pickybuys.com',
      currencyType: 'PTH',
      userType: 'MA',
      paymentMode: 1,
      userCSSName: 'lv_3',
      userShowCode: 'MA',
      balance: 62.72,
      playerBalance: 62.72,
      creditLimit: 0,
      creditRef: 0,
      creditOut: 0,
      creditPL: 0,
      accountRebate: 0,
      status: 'Active',
      isLocked: 0,
      userLevel: 3,
      isSuspended: 0,
      isSystemLocked: 0,
      isSystemSuspended: 0,
      isMaxWinSuspended: 0,
      isMaxLossSuspended: 0,
      isPassLock: 0,
      isFromApi: false,
      showBalance: false
    },
  ];

  public myData1 = {
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

  demoUsers2 = [
    {
      userID: 'prabhu007',
      site: 1,
      siteLogo: 'SKYEXCHANGE',
      fullName: ' ',
      email: 'xyz@gmail.com',
      currencyType: 'PTH',
      userType: 'PL',
      paymentMode: 1,
      userCSSName: 'lv_4',
      userShowCode: 'PL',
      balance: 62.72,
      playerBalance: 0,
      creditLimit: 0,
      creditRef: 0,
      exposureLimit: 60,
      creditPL: 62.72,
      profitLoss: -7.28,
      status: 'Active',
      isLocked: 0,
      userLevel: 0,
      isSuspended: 0,
      isSystemLocked: 0,
      isSystemSuspended: 0,
      isMaxWinSuspended: 0,
      isMaxLossSuspended: 0,
      isPassLock: 0,
      isFromApi: false,
    },
    {
      userID: 'vespar',
      site: 1,
      siteLogo: 'SKYEXCHANGE',
      fullName: ' ',
      email: 'vesparopsu@nedoz.com',
      currencyType: 'PTH',
      userType: 'PL',
      paymentMode: 1,
      userCSSName: 'lv_4',
      userShowCode: 'PL',
      balance: 0,
      playerBalance: 0,
      creditLimit: 0,
      creditRef: 0,
      exposureLimit: 0,
      creditPL: 0,
      profitLoss: 0,
      status: 'Active',
      isLocked: 0,
      userLevel: 0,
      isSuspended: 0,
      isSystemLocked: 0,
      isSystemSuspended: 0,
      isMaxWinSuspended: 0,
      isMaxLossSuspended: 0,
      isPassLock: 0,
      isFromApi: false,
    },
  ];

  myData2 = {
    currencyTypeName: 'PTH',
    currencySymbol: '',
    totalBalance: 62.72,
    mastersBalance: 0,
    mastersAvailBal: 0,
    directUserType: 0,
    myCreditLimit: 0,
    totalCreditGivenOut: 0,
    myCreditAvailBal: 0,
    userLevel: 4,
  };
  constructor() {
    this.userList = this.demoUsers1;
    this.userData = this.myData1;
  }

  ngOnInit(): void {}

  toggleAddMemberModal() {
    this.addMemberModalOpen = true;
  }

  openCreditRefModal() {
    this.creditRefModalOpen = true;
  }

  openChangeStatusModal() {
    this.changeStatusOpen = true;
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

  openNextLevel(userID: number, userLevel: number) {
    if (userLevel === 4) {
      this.userList = this.demoUsers1;
      this.userData = this.myData1;
      this.showAddMemberButton = true;
    } else {
      this.showAddMemberButton = false;
      this.userList = this.demoUsers2;
      this.userData = this.myData2;
    }
  }

  trackBy(index, item) {
    return index;
  }
}
