import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITransfer } from './types/transfer';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  private baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  transfer(data: ITransfer) {
    return this.httpClient.post(`${this.baseUrl}/transfert`, data)
  }
}
