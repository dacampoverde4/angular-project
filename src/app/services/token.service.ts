import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const AUTH_TOKEN = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookie: CookieService) {}

  set(token: string) {
    this.cookie.set(AUTH_TOKEN, token);
  }

  get() {
    return this.cookie.get(AUTH_TOKEN);
  }

  delete() {
    this.cookie.delete(AUTH_TOKEN);
  }

  check() {
    return this.cookie.check(AUTH_TOKEN);
  }
}
