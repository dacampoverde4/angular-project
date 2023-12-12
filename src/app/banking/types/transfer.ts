export interface ITransfer {
  password: string;
  users: {
    userId: number;
    txnType: number;
    amount: number;
    remark: string;
    creditRef: number;
  }[];
}
