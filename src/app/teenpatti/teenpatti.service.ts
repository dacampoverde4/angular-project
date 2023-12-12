import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeenpattiService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  listTeenpatti(selctedGid: number) {
    return this.httpClient.get(`${this.baseUrl}/listCasinoTable/${selctedGid}`);
  }

  activateListTeenpatti() {
    return this.httpClient.get(`${this.baseUrl}/listCasinoTable`);
  }

  activeCasino(params) {
    return this.httpClient.post(`${this.baseUrl}/activateCasinoTable`, params);
  }
}
