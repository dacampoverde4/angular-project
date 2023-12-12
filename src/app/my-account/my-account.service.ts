import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  logActivity() {
    return this.http.get(`${this.baseUrl}/logActivity`)
  }
}
