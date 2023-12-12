import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../shared/types/generic-response';
import { Hierarchy } from '../shared/types/hierarchy';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _hierarchyList = new ReplaySubject<Hierarchy[]>(1);
  heirarcyList$ = this._hierarchyList.asObservable();
  private baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  listHierarchy() {
    this.http.get(`${this.baseUrl}/listHierarchy`)
      .subscribe((res: GenericResponse<Hierarchy>) => {
        if (res && res.errorCode === 0) {
          this._hierarchyList.next(res.result[0]);
        }
      })
  }
}
