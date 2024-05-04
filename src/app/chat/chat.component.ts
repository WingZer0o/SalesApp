import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { IonTabs, IonTabBar, IonIcon, IonLabel, IonTabButton, IonRouterOutlet } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonTabButton, IonLabel, IonIcon, IonTabBar, IonTabs, MaterialModule, CommonModule]
})
export class ChatComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
}
