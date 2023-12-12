import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { ActivityLog } from '../models/activity-log.model';
import { MyAccountService } from "../my-account.service";

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {

  logList = Array<ActivityLog>();
  p: number = 1;
  constructor(
    private myAccountService: MyAccountService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.myAccountService.logActivity()
      .subscribe((res: GenericResponse<ActivityLog[]>) => {
        if (res.errorCode === 0) {
          this.logList = res.result.sort((a, b) => {
            return Date.parse(b.loginTime) - Date.parse(a.loginTime);
          })
          this.loadingService.setLoading(false);
        }
      })
  }

}
