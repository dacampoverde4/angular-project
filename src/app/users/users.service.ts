import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeStatus } from './models/change-status';
import { CreateUser } from './models/create-user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  listHierarchy() {
    return this.httpClient.get(`${this.baseUrl}/listHierarchy`);
  }

  listUserLog(selctedUid: number) {
    return this.httpClient.get(`${this.baseUrl}/logActivity/${selctedUid}`);
  }

  getUser(selctedUid: number) {
    return this.httpClient.get(`${this.baseUrl}/getUser/${selctedUid}`);
  }

  listUser(selctedUid: number, userType?: number) {
    if (userType) {
      return this.httpClient.get(`${this.baseUrl}/listUsers/${selctedUid}/${userType}`);
    } else {
      return this.httpClient.get(`${this.baseUrl}/listUsers/${selctedUid}`);
    }
  }

  updateStatus(userId: number, data: ChangeStatus) {
    return this.httpClient.post(`${this.baseUrl}/updateUser/${userId}`, data)
  }

  registration(user: CreateUser) {
    return this.httpClient.post(`${this.baseUrl}/registration`, user);
  }
}
