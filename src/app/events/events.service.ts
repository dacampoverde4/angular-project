import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  listGame() {
    return this.httpClient.get(`${this.baseUrl}/listGames`);
  }

  activateListGame() {
    return this.httpClient.get(`${this.baseUrl}/listActiveGames`);
  }

  getGame(selctedGid: number) {
    return this.httpClient.get(`${this.baseUrl}/listGames/${selctedGid}`);
  }

  activeGame(gameIds) {
    return this.httpClient.post(`${this.baseUrl}/activateGames`, gameIds);
  }
}
