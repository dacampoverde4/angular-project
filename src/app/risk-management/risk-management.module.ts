import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskManagementComponent } from './risk-management.component';
import { RouterModule, Routes } from '@angular/router';
import { TabModule } from 'angular-tabs-component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'risk-management',
    pathMatch: 'full'
  },
  {
    path: 'risk-management',
    component: RiskManagementComponent
  }
]

@NgModule({
  declarations: [RiskManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabModule
  ]
})
export class RiskManagementModule { }
