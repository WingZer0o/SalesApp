import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent } from '@ionic/angular/standalone';
import { MaterialModule } from './modules/material.module';
import { RouterEventService } from './services/router-event.service';
import { ChatMainFooterComponent } from './shared/components/footers/chat-main-footer/chat-main-footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonContent, IonFooter, IonTitle, IonToolbar, IonHeader, IonApp, IonRouterOutlet, ReactiveFormsModule, MaterialModule, ChatMainFooterComponent],
})
export class AppComponent {
  
  constructor(
    public routerEventService: RouterEventService
  ) {
    
  }
}