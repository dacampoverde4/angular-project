import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessagesTicker } from './models/ticker.model';
import { MessagesRules } from './models/rules.model';
import { MessagesCommentary } from './models/commentary.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  createTicker(ticker: MessagesTicker) {
    return this.httpClient.post(`${this.baseUrl}/ticker`, ticker);
  }

  createRules(rules: MessagesRules) {
    return this.httpClient.post(`${this.baseUrl}/rules`, rules);
  }

  createCommentary(commentary: MessagesCommentary) {
    return this.httpClient.post(`${this.baseUrl}/commentary`, commentary);
  }
}
