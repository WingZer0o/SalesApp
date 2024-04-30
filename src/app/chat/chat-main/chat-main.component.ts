import { Component, ElementRef, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { ChatMessage } from 'src/app/models/chat-main/chat-message';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule]
})
export class ChatMainComponent  implements OnInit {
  @ViewChildren('chatMessage')
  chatMessage!: QueryList<ElementRef>;

  public chatMessages: ChatMessage[] = [];

  constructor() { }

  ngOnInit() {
    this.chatMessages.push(new ChatMessage(1, "Hello there I came acorss this, blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg blahg ", "John Doe", "Mike Mulchrone", new Date()));
  }


  public animateChat(message: string, chatIndex: number) {
    if (this.chatMessage) {
      const elementRef = this.chatMessage.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        const typeWriter = new Typewriter(elementRef, { loop: false, typingSpeed: 25, deletingSpeed: 50 });
        typeWriter.typeString(message).start();
      }
    }
  }
}
