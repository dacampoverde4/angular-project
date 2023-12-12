import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingComponent } from './banking.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banking',
    pathMatch: 'full'
  },
  {
    path: 'banking',
    component: BankingComponent
  }
]

@NgModule({
  declarations: [BankingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BankingModule { }
