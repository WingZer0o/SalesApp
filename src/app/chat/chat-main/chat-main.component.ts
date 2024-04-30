import { Component, OnInit } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { ChatMessage } from 'src/app/models/chat-main/chat-message';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule]
})
export class ChatMainComponent  implements OnInit {

  public chatMessages: ChatMessage[] = [];

  constructor() { }

  ngOnInit() {
    this.chatMessages.push(new ChatMessage(1, "Hello", "John Doe", "Mike Mulchrone", new Date()));
  }

}
