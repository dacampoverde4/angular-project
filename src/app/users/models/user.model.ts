export class User {
  userId: number;
  userName: string;
  name: string;
  balance: number;
  loginTime: Date;
  conversion: number;
  userType: number;
  creditRef: number;

  loginStatus: number;
  userStatus: number;
  parentId: number;
  userAccess: string;
  minStake: number;
  maxStake: number;
  maxProfit: number;
  beforeInplayProfit: number;
  betLock: number;
  volumeSource: number;
  volMultiplier: number;
  betDelay: number;
  winCommission: number;
  unmatchedBets: number;
  parentDetails: string;
  createdTime: Date;
  sharePercent: number;
  currencyId: number;
  isVrnlCustomer: number;
  domainName: string;
  loginIp: string;
  notes: string;

  showBalance = false;
  selectDW: 1 | 2 = null;
  editCreditRef: boolean = false;
}
