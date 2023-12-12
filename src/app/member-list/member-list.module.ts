import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AccountDetailsComponent } from './account-details.component';
import { PnlComponent } from './pnl/pnl.component';
import { SummaryComponent } from './summary/summary.component';
import { BettingHistoryComponent } from './betting-history/betting-history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from '../modal/modal.module';

const routes: Routes = [
  {
    path: ':userID',
    component: AccountDetailsComponent,
    children: [
      {
        path: 'accountSummary',
        component: SummaryComponent,
      },
      {
        path: 'profitAndLoss',
        component: PnlComponent,
      },
      {
        path: 'bettingHistory',
        component: BettingHistoryComponent,
      },
      {
        path: 'transactionCashHistory',
        component: TransactionHistoryComponent
      },
      {
        path: 'loginHistory',
        component: LoginHistoryComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AccountDetailsComponent,
    SummaryComponent,
    PnlComponent,
    BettingHistoryComponent,
    TransactionHistoryComponent,
    LoginHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    DpDatePickerModule,
    NgxPaginationModule,
    ModalModule
  ],
})
export class MemberListModule {}
