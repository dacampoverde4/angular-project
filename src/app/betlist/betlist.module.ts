import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BetlistComponent } from './betlist.component';
import { BetListLiveComponent } from './bet-list-live/bet-list-live.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bet-list'
  },
  {
    path: 'bet-list',
    component: BetlistComponent
  },
  {
    path: 'bet-list-live',
    component: BetListLiveComponent
  }
]

@NgModule({
  declarations: [
    BetlistComponent,
    BetListLiveComponent
  ],
  imports: [
    CommonModule,
    DpDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BetlistModule { }
