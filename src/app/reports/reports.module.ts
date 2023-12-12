import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlDownlineComponent } from './pl-downline/pl-downline.component';
import { PlMarketComponent } from './pl-market/pl-market.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginlogoutComponent } from './loginlogout/loginlogout.component';
import { TransferStatementComponent } from './transfer-statement/transfer-statement.component';
import { RejectBetHistoryComponent } from './reject-bet-history/reject-bet-history.component';
import { VoidBetsComponent } from './void-bets/void-bets.component';
import { NewAccountsComponent } from './new-accounts/new-accounts.component';

const routes: Routes = [
  {
    path: 'pl-downline',
    component: PlDownlineComponent,
  },
  {
    path: 'pl-market',
    component: PlMarketComponent,
  },
  {
    path: 'loginlogout',
    component: LoginlogoutComponent,
  },
  {
    path: 'transfer-statement',
    component: TransferStatementComponent,
  },
  {
    path: 'reject-bet-history',
    component: RejectBetHistoryComponent,
  },
  {
    path: 'void-bets',
    component: VoidBetsComponent,
  },
  {
    path: 'new-accounts',
    component: NewAccountsComponent
  }
];

@NgModule({
  declarations: [
    PlDownlineComponent,
    PlMarketComponent,
    LoginlogoutComponent,
    TransferStatementComponent,
    RejectBetHistoryComponent,
    VoidBetsComponent,
    NewAccountsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DpDatePickerModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class ReportsModule {}
