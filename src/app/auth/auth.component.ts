import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonTabBar, IonRouterOutlet, IonToolbar, IonFooter, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [IonTitle, IonFooter, IonToolbar, IonRouterOutlet, IonTabBar, IonLabel, IonIcon, IonTabButton, IonTabs, RouterModule ]
})
export class AuthComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
