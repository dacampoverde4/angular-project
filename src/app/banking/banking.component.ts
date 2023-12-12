import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { CurrentUser } from '../shared/models/current-user';
import { GenericResponse } from '../shared/types/generic-response';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { BankingService } from './banking.service';
import { ITransfer } from './types/transfer';

const amountValidator: ValidatorFn = (
  group: FormGroup
): ValidationErrors | null => {
  const txnType = group.get('txnType').value;
  const hasValue = group.get('amount').value;
  return !(txnType === 1 || txnType === 2) && hasValue
    ? { txnTypeRequiredError: true }
    : null;
};

const txnValidator: ValidatorFn = (
  group: FormGroup
): ValidationErrors | null => {
  const txnType = group.get('txnType').value;
  const hasValue = group.get('amount').value;
  return (txnType === 1 || txnType === 2) && !hasValue
    ? { amountRequiredError: true }
    : null;
};

const remarkValidator: ValidatorFn = (
  group: FormGroup
): ValidationErrors | null => {
  const txnType = group.get('txnType').value;
  const hasValue = group.get('amount').value;
  const creditRefValue = group.get('creditRef').value;
  const remarkValue = group.get('remark').value;
  return (remarkValue && !hasValue) || (remarkValue && !creditRefValue)
    ? { remarkWithoutTransfer: true }
    : null;
};

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss'],
})
export class BankingComponent implements OnInit {
  currentUser: CurrentUser;
  usersList: User[];
  transferForm: FormGroup;
  validRow: number = 0;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private bakingService: BankingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      password: [, Validators.required],
      users: this.formBuilder.array([]),
    });
    this.currentUser = this.authService.currentUser;
    this.loadingService.setLoading(true);
    this.listUser();

    this.transferForm.valueChanges.subscribe((val: ITransfer) => {
      val.users = val.users.filter(
        (user) =>
          ((user.txnType === 1 || user.txnType === 2) && user.amount) ||
          user.creditRef
      );

      this.validRow = val.users.length;
    });
  }

  get usersArray() {
    return this.transferForm.get('users') as FormArray;
  }

  listUser() {
    this.usersService
      .listUser(this.currentUser.userId)
      .subscribe((res: GenericResponse<User[]>) => {
        if (res.errorCode === 0) {
          this.usersList = res.result;
          res.result.forEach((user) => {
            user.selectDW = null;
            this.addRow(user);
          });
          this.loadingService.setLoading(false);
        }
      });
  }

  addRow(user: User) {
    let row = this.formBuilder.group({
      userId: [user.userId],
      txnType: [0],
      amount: [],
      remark: [''],
      creditRef: [0],
    });
    this.usersArray.push(row);
  }

  transfer() {
    if (this.transferForm.valid) {
      console.log(this.transferForm.value);
      let transferValue: ITransfer = this.transferForm.value;
      transferValue.users = transferValue.users.filter((user) => {
        if (
          ((user.txnType === 1 || user.txnType === 2) && user.amount) ||
          (user.txnType === 3 && user.creditRef)
        ) {
          return true;
        }
      })
      transferValue.users.map((user) => {
        if (user.txnType === 3) {
          user.amount = user.creditRef;
          delete user.creditRef;
        }
      })
      if (transferValue.users.length) {
        this.bakingService
          .transfer(this.transferForm.value)
          .subscribe((res: GenericResponse<any>) => {
            console.log(res);
            if (res && res.errorCode === 0) {
              this.toastr.success('Transaction Successful');
              this.listUser();
              this.resetTransferForm();
            } else {
              this.toastr.error(res.errorDescription);
            }
          });
      } else {
        this.toastr.error('Invalid Input');
      }
    } else {
      console.log(this.transferForm);

      this.toastr.error('Invalid Input');
    }
  }

  resetTransferForm() {
    this.transferForm.get('password').reset();
    this.usersArray.controls.forEach((control) => {
      control.get('txnType').reset();
      control.get('amount').reset();
      control.get('creditRef').reset();
    })
  }

  cancelAll() {
    this.usersArray.controls.forEach((user) => {
      user.get('txnType').reset();
      user.get('amount').reset();
      user.get('creditRef').reset();
      user.get('remark').reset();
    });
  }

  editCreditRef(user: User) {
    this.usersArray.controls.forEach((userControl) => {
      if (userControl.get('userId').value === user.userId) {
        userControl.get('amount').setValue(null);
        userControl.get('txnType').setValue(3);
      }
    });
    user.editCreditRef = true;
  }

  cancelEditCreditRef(user: User) {
    this.usersArray.controls.forEach((userControl) => {
      if (userControl.get('userId').value === user.userId) {
        userControl.get('creditRef').reset();
        userControl.get('txnType').setValue(0);
      }
    });
    user.editCreditRef = false;
  }

  selectTxType(user: User, type: 1 | 2) {
    setTimeout(() => {
      user.selectDW = type;
      this.usersArray.controls.forEach((userControl) => {
        if (userControl.get('userId').value === user.userId) {
          userControl.get('creditRef').reset();
        }
      });
    });
  }

  trackById(idx, id) {
    return id.userId;
  }
}
