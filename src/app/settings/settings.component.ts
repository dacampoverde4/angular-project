import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { CurrentUser } from '../shared/models/current-user';
import { GenericResponse } from '../shared/types/generic-response';
import { Hierarchy } from '../shared/types/hierarchy';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { SettingsService } from './settings.service';

export class SettingsWise {
  typeWise: string;
  usersWise: string;
  sport: number;
  event: number;
  market: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  hierarchyList = Array<Hierarchy>();
  currentUser: CurrentUser;
  usersListMap: { userType: number; users: User[] } | {} = {};

  settingForm: FormGroup;

  private _settingsWiseSubject = new BehaviorSubject<SettingsWise>(
    new SettingsWise()
  );
  private settingsWise$ = this._settingsWiseSubject.asObservable();

  showLimitSettings = true;
  showMarketSettings = true;
  showSessionSettings = true;

  constructor(
    private common: CommonService,
    private usersService: UsersService,
    private settingsService: SettingsService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      userId: [0],
      typeWise: ['default'],
      value: ['0'],
      limitSetting: this.formBuilder.group({
        exposureLimit: [0.0],
        betDelay: [0.0],
        fancyBonus: [0.0],
        exposurelimit: [0.0],
        bookmakingCommission: [0.0],
        matchOddsCommission: [0.0],
        fancyCommission: [0.0],
      }),
      marketSetting: this.formBuilder.group({
        betMinRate: [0.0, Validators.required],
        betMaxRate: [0.0, Validators.required],
        minStake: [0.0, Validators.required],
        maxStake: [0.0, Validators.required],
        maxProfit: [0.0, Validators.required],
        maxLoss: [0.0, Validators.required],
        commission: [0.0, Validators.required],
        volMultiplier: [0.0, Validators.required],
        marketBeforeInplayLimit: [0.0, Validators.required],
      }),
    });

    this.addSessionControl();

    this.common.heirarcyList$.subscribe((list) => {
      this.hierarchyList = list;
    });
    this.usersService
      .listUser(this.auth.currentUser.userId)
      .subscribe((res: GenericResponse<User[]>) => {
        if (res.errorCode === 0) {
          res.result.forEach((user) => {
            if (user.userType in this.usersListMap) {
              this.usersListMap[user.userType].push(user);
            } else {
              this.usersListMap[user.userType] = [user];
            }
          });
        }
      });

    this.settingsWise$.subscribe((settingsWise) => {
      console.log(settingsWise);
      if (settingsWise.sport && settingsWise.sport !== 4) {
        this.showSessionSettings = false;
        this.settingForm.removeControl('sessionSetting');
        this.settingForm.updateValueAndValidity();
      } else {
        this.showSessionSettings = true;
        this.addSessionControl();
        this.settingForm.updateValueAndValidity();
      }
    });
  }

  addSessionControl() {
    let sessionFormGroup = this.formBuilder.group({
      minStake: [0.0, Validators.required],
      maxStake: [0.0, Validators.required],
      maxProfit: [0.0, Validators.required],
      maxLoss: [0.0, Validators.required],
      commission: [0.0, Validators.required],
      perRateMaxStake: [0.0, Validators.required],
    })
    this.settingForm.addControl('sessionSetting', sessionFormGroup)
  }

  submit() {
    console.log(this.settingForm, this.settingForm.valid);
    if (this.settingForm.valid) {
      this.settingsService
        .setSetting(this.settingForm.value)
        .subscribe((res: GenericResponse<any>) => {
          if (res && res.errorCode === 0) {
            this.toastr.success(res.errorDescription);
          } else {
            this.toastr.error('Something went wrong');
          }
        });
    } else {
      this.toastr.error('Invalid Input');
    }
  }

  setUsersWise(event: Event, id?: string) {
    if (this.settingForm.get('value').value === 0) {
      this.settingForm.get('userId').setValue(0);
    }
    if ((<HTMLInputElement>event.target).checked) {
      let elements = <HTMLCollectionOf<HTMLElement>>(
        document.getElementsByClassName('user-wise')
      );
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.display = 'none';
      }
      if (id) {
        document.getElementById(id).style.display = 'block';
      }
    }

    this.settingForm.get('userId').setValue(0);
    let settingWise = this._settingsWiseSubject.getValue();
    settingWise.usersWise = (<HTMLInputElement>event.target).value;
    this._settingsWiseSubject.next(settingWise);
  }

  setTypeWise(typeWise: string) {
    let settingWise = this._settingsWiseSubject.getValue();
    settingWise.sport = 0;
    this.settingForm.get('value').setValue('0');
    settingWise.event = 0;
    settingWise.market = '';
    settingWise.typeWise = typeWise;
    this._settingsWiseSubject.next(settingWise);
  }

  selectSport(sportId: number) {
    let settingWise = this._settingsWiseSubject.getValue();
    settingWise.sport = +sportId;
    this._settingsWiseSubject.next(settingWise);
  }

  selectEvent(eventId: number) {
    let settingWise = this._settingsWiseSubject.getValue();
    settingWise.event = +eventId;
    this._settingsWiseSubject.next(settingWise);
  }

  selectMarket(marketId: string) {
    let settingWise = this._settingsWiseSubject.getValue();
    settingWise.market = marketId;
    this._settingsWiseSubject.next(settingWise);
  }
}
