import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/angular/standalone";
import { MaterialModule } from '../modules/material.module';
import { ChatMainFooterComponent } from '../shared/components/footers/chat-main-footer/chat-main-footer.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonTabButton, IonLabel, IonIcon, IonTabBar, IonTabs, MaterialModule, CommonModule, ChatMainFooterComponent]
})
export class ChatComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
}
