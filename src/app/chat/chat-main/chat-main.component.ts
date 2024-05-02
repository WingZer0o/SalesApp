import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { ChatChannelResponseDto } from 'src/app/models/chat-main/chat-channel-response-dto';
import { ChatMessage } from 'src/app/models/chat-main/chat-message';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { AuthGuardService } from 'src/app/services/http/auth-guard.service';
import { ChatHttpService } from 'src/app/services/http/chat-http.service';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule, ReactiveFormsModule, CommonModule]
})
export class ChatMainComponent  implements OnInit {
  @ViewChild('chatHistory', {static: false})
  chatHistory!: ElementRef;

  @ViewChildren('chatMessage')
  uiChatMessages!: QueryList<ElementRef>;

  public isLoading: boolean = true;
  public chatMessages: ChatMessage[] = [];
  public currentChatChannelId!: number;
  public currentUserId!: string;

  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chatHttpService: ChatHttpService,
    private authGuardService: AuthGuardService
  ) { }

  async ngOnInit() {
    try {
      this.currentUserId = this.authGuardService.getDecodedToken()?.userId;
      const response: ChatChannelResponseDto = await this.chatHttpService.getChatChannel();
      this.currentChatChannelId = response.channelId;
      response.chatMessages.forEach((chatMessage, index) => {
        chatMessage.isChatBot = false;
      });
      this.chatMessages.push(...response.chatMessages);
      this.isLoading = false;
      this.inputForm = this.formBuilder.group({
        input: ['', Validators.required]
      });
      setTimeout(() => {
        this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
      }, 100);
    } catch (error) {

     }
  }


  public animateChat(chatMessage: ChatMessage, chatIndex: number) {
    if (this.uiChatMessages) {
      const elementRef = this.uiChatMessages.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef?.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        if (chatMessage.isChatBot) {
          const typeWriter = new Typewriter(elementRef, { loop: false, typingSpeed: 25, deletingSpeed: 50, parentScroll: this.chatHistory.nativeElement });
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
        const newChatMessage = new ChatMessage(uuidv4(), message, new Date(), false, this.currentChatChannelId, this.currentUserId);
        this.chatMessages.push(newChatMessage);
        setTimeout(() => {
          this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
        }, 100);
        this.inputForm.reset();
        const response: ChatMessage = await this.chatHttpService.simpleChatMessage(newChatMessage);
        this.chatMessages.push(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
