import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatDrawer } from '@angular/material/sidenav';
import { IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonCol, IonRow } from "@ionic/angular/standalone";
import { Subject, takeUntil } from 'rxjs';
import { ChatChannelDto, ChatChannelListDto } from 'src/app/models/chat-main/chat-channel-list-dto';
import { ChatChannelResponseDto } from 'src/app/models/chat-main/chat-channel-response-dto';
import { ChatMessageDto } from 'src/app/models/chat-main/chat-message-dto';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { AuthGuardService } from 'src/app/services/http/auth-guard.service';
import { ChatHttpService } from 'src/app/services/http/chat-http.service';
import { ChatMainFooterComponent } from 'src/app/shared/components/footers/chat-main-footer/chat-main-footer.component';
import { ChatMainFooterService } from 'src/app/shared/components/footers/chat-main-footer/chat-main-footer.service';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';
import { v4 as uuidv4 } from 'uuid';
import { AddChatChannelComponent } from '../add-chat-channel/add-chat-channel.component';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonFooter, IonContent, IonHeader, IonToolbar, IonTitle, MaterialModule, SharedModule, ReactiveFormsModule, ChatMainFooterComponent]
})
export class ChatMainComponent implements OnInit, OnDestroy {
  @ViewChild('content')
  content!: IonContent;
  
  @ViewChild('drawer')
  drawer!: MatDrawer;

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

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private chatHttpService: ChatHttpService,
    private authGuardService: AuthGuardService,
    private dialog: MatDialog,
    private chatMainFooterInputSubmitSubject: ChatMainFooterService
  ) { }


  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  async ngOnInit() {
    try {
      this.currentUserId = this.authGuardService.getDecodedToken()?.userId;
      this.chatMainFooterInputSubmitSubject.chatMainFooterInputSubmitSubject.pipe(takeUntil(this.onDestroy$)).subscribe((message: string) => {
        this.handleInputSend(message);
      });
      const chatChannelListResponse: ChatChannelListDto = await this.chatHttpService.getChatChannelList();
      this.chatChannels.push(...chatChannelListResponse.chatChannels);
      const chatChannelResponse: ChatChannelResponseDto = await this.chatHttpService.getChatChannel(chatChannelListResponse.chatChannels[0].id);
      this.currentChatChannelId = chatChannelResponse.channelId;
      this.chatMessages.push(...chatChannelResponse.chatMessages);
      this.isLoading = false;
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    } catch (error) {

     }
  }

  public openDrawer(): void {
    this.drawer.toggle();
  }

  public addChatChannel(): void {
    const dialog = this.dialog.open(AddChatChannelComponent);
    dialog.componentInstance.addChatChannelEvent.subscribe((channelName: string) => {
      this.chatHttpService.addChatChannel(channelName).then((response: ChatChannelDto) => {
        this.chatChannels.push(response);
      });
    });
  }

  public handleChatChannelChanged(event: MatRadioChange): void {
    this.chatHttpService.getChatChannel(event.value).then((response: ChatChannelResponseDto) => {
      this.currentChatChannelId = response.channelId;
      this.chatMessages = response.chatMessages;
    });
  }


  public animateChat(chatMessage: ChatMessageDto, chatIndex: number) {
    if (this.uiChatMessages) {
      const elementRef = this.uiChatMessages.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef?.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        if (chatMessage.isChatBot && !chatMessage.isFirstMessage) {
          const typeWriter = new Typewriter(elementRef, { loop: false, typingSpeed: 25, deletingSpeed: 50});
          typeWriter.scrollNotificationSubject.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
            this.content.scrollToBottom(300);
          });
          typeWriter.typeString(chatMessage.message).start().then(() => {
            this.content.scrollToBottom(300);
          });
        } else {
          elementRef.append(chatMessage.message);
        }
      }
    }
  }

  public async handleInputSend(message: string): Promise<void> {
    try {
        const newChatMessage = new ChatMessageDto(uuidv4(), message, new Date(), false, this.currentChatChannelId, this.currentUserId, false);
        this.chatMessages.push(newChatMessage);
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 100);
        const response: ChatMessageDto = await this.chatHttpService.simpleChatMessage(newChatMessage);
        this.chatMessages.push(response);
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 100)
    } catch (error: any) {
      console.error(error);
    }
  }
}
