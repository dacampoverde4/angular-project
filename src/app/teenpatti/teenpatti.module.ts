import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeenpattiComponent } from './teenpatti.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-date-picker';

const routes: Routes = [
  {
    path: '',
    component: TeenpattiComponent
  }
]

@NgModule({
  declarations: [TeenpattiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ModalModule,
    DpDatePickerModule
  ]
})
export class TeenpattiModule { }
