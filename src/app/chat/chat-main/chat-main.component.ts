import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { ChatChannelDto, ChatChannelListDto } from 'src/app/models/chat-main/chat-channel-list-dto';
import { ChatChannelResponseDto } from 'src/app/models/chat-main/chat-channel-response-dto';
import { ChatMessageDto } from 'src/app/models/chat-main/chat-message-dto';
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
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule, ReactiveFormsModule]
})
export class ChatMainComponent  implements OnInit {
  @ViewChild('chatHistory', {static: false})
  chatHistory!: ElementRef;

  @ViewChildren('chatMessage')
  uiChatMessages!: QueryList<ElementRef>;

  public isLoading: boolean = true;
  public chatChannels: ChatChannelDto[] = [];
  public chatMessages: ChatMessageDto[] = [];
  public currentChatChannelId!: number;
  public currentUserId!: string;
  public selectedChannelId!: string;

  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chatHttpService: ChatHttpService,
    private authGuardService: AuthGuardService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    try {
      this.currentUserId = this.authGuardService.getDecodedToken()?.userId;
      const chatChannelListResponse: ChatChannelListDto = await this.chatHttpService.getChatChannelList();
      this.chatChannels.push(...chatChannelListResponse.chatChannels);
      const chatChannelResponse: ChatChannelResponseDto = await this.chatHttpService.getChatChannel(chatChannelListResponse.chatChannels[0].id);
      this.currentChatChannelId = chatChannelResponse.channelId;
      this.chatMessages.push(...chatChannelResponse.chatMessages);
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

  public addChatChannel(): void {
    console.log('test');
    // TODO: Implement addChatChannel
  }


  public animateChat(chatMessage: ChatMessageDto, chatIndex: number) {
    if (this.uiChatMessages) {
      const elementRef = this.uiChatMessages.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef?.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        if (chatMessage.isChatBot && !chatMessage.isFirstMessage) {
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
        const newChatMessage = new ChatMessageDto(uuidv4(), message, new Date(), false, this.currentChatChannelId, this.currentUserId, false);
        this.chatMessages.push(newChatMessage);
        setTimeout(() => {
          this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
        }, 100);
        this.inputForm.reset();
        const response: ChatMessageDto = await this.chatHttpService.simpleChatMessage(newChatMessage);
        this.chatMessages.push(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
