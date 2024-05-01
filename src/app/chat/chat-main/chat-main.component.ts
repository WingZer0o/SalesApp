import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { ChatMessage } from 'src/app/models/chat-main/chat-message';
import { ChatMessageRequestDto } from 'src/app/models/chat-main/chat-message-request-dto';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { ChatHttpService } from 'src/app/services/http/chat-http.service';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule, ReactiveFormsModule, CommonModule]
})
export class ChatMainComponent  implements OnInit {
  @ViewChildren('chatMessage')
  uiChatMessages!: QueryList<ElementRef>;

  public chatMessages: ChatMessage[] = [];

  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chatHttpService: ChatHttpService
  ) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }


  public animateChat(chatMessage: ChatMessage, chatIndex: number) {
    if (this.uiChatMessages) {
      const elementRef = this.uiChatMessages.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef?.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        if (chatMessage.isChatBot) {
          const typeWriter = new Typewriter(elementRef, { loop: false, typingSpeed: 25, deletingSpeed: 50 });
          typeWriter.typeString(chatMessage.message).start();
        } else {
          elementRef.append(chatMessage.message);
        }
      }
    }
  }

  public async handleInputSend(): Promise<void> {
    try {
      if (this.inputForm.valid) {
        const message = this.inputForm.get('input')?.value;
        this.chatMessages.push(new ChatMessage(1, message, "", "John Doe", new Date(), false));
        this.inputForm.reset();
        const requestDto = new ChatMessageRequestDto(message);
        const response = await this.chatHttpService.simpleChatMessage(requestDto);
      }
    } catch (error: any) {
      console.error(error.error.errorMessage);
    }
  }
}
