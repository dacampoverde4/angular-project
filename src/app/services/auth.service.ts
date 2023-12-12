import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../shared/models/current-user';
import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

export const CURRENT_USER = 'current_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUser: CurrentUser = null;
  currentUser$ = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {
    if (cookieService.check(CURRENT_USER)) {
      this.currentUser = JSON.parse(cookieService.get(CURRENT_USER));
      this.currentUser$.next(this.currentUser);
    }
  }

  login(userData: {
    userName: string;
    pwd: string;
  }): Observable<{
    errorCode: number;
    errorDescription: string | null;
    result: Array<any>;
  }> {
    return this.http.post<{
      errorCode: number;
      errorDescription: string | null;
      result: Array<any>;
    }>(`${this.baseUrl}/login`, userData);
  }

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn.next(loggedIn);
  }

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
    this.currentUser$.next(user);
    this.cookieService.set(CURRENT_USER, JSON.stringify(user));
  }

  checkIsLoggedIn() {
    return this.tokenService.check();
  }

  getCaptcha() {
    return this.http.get(`${this.baseUrl}/img.png`);
  }

  logout() {
    this.http.get(`${this.baseUrl}/logout`).subscribe((res) => {
      this.tokenService.delete();
      this.setLoggedIn(false);
      this.setCurrentUser(null);
    });
  }
}
