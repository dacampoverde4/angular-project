import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISetting } from './types/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  setSetting(data: ISetting) {
    return this.httpClient.post(`${this.baseUrl}/setSetting`, data);
  }
}
