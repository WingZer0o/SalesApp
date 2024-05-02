import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { environment } from 'src/environments/environment';
import { ChatChannelResponseDto } from 'src/app/models/chat-main/chat-channel-response-dto';
import { ChatMessage } from 'src/app/models/chat-main/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  constructor(private httpClient: HttpClientService) { }

  public getChatChannel(): Promise<ChatChannelResponseDto> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'chat-channel';
      this.httpClient.get(url).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  public simpleChatMessage(body: ChatMessage): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'simple-chat';
      this.httpClient.post(url, body).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
