import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';
import { RouterModule, Routes } from '@angular/router';
import { ReportbetComponent } from './reportbet/reportbet.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent,
  },
  {
    path: 'reportbet',
    component: ReportbetComponent,
  },
];

@NgModule({
  declarations: [AnalysisComponent, ReportbetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DpDatePickerModule,
    FormsModule,
    ModalModule,
    NgxPaginationModule
  ],
})
export class AnalysisModule {}
