import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent } from '@ionic/angular/standalone';
import { MaterialModule } from './modules/material.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonContent, IonFooter, IonTitle, IonToolbar, IonHeader, IonApp, IonRouterOutlet, ReactiveFormsModule, MaterialModule],
})
export class AppComponent implements OnInit {
  public inputForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }

  public async handleInputSend(): Promise<void> {
    if (this.inputForm.valid) {
      // TODO: implement service to call handleInputSend in chat-main-component.ts with this.inputForm.value.input
    }
  }
}