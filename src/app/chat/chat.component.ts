import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { IonTabs, IonTabBar, IonIcon, IonLabel, IonTabButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonTabButton, IonLabel, IonIcon, IonTabBar, IonTabs, MaterialModule, CommonModule]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
