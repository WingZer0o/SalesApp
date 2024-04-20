import { Component, OnInit } from '@angular/core';
import { IonContent, IonToolbar, IonTitle, IonHeader, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, IonFooter } from "@ionic/angular/standalone";
import { MaterialModule } from '../modules/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginHttpService } from '../services/http/login-http.service';
import { LoginDto } from '../models/login/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonFooter, IonCol, IonRow, IonGrid, IonInput, IonItem, IonList, IonHeader, IonTitle, IonToolbar, IonContent, MaterialModule, ReactiveFormsModule ]
})
export class LoginComponent  implements OnInit {

  public form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private loginHttpService: LoginHttpService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public submitUserLogin(): void {
    const postBody: LoginDto = new LoginDto(this.form.get('userName')?.value, this.form.get('password')?.value);
    this.loginHttpService.login(postBody);
  }
}
