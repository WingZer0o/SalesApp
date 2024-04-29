import { Component, OnInit } from "@angular/core";
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import { MaterialModule } from "../../modules/material.module";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginHttpService } from "../../services/http/login-http.service";
import { LoginDto } from "../../models/login/login-dto";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonItem,
    IonList,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginHttpService: LoginHttpService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["mtmulch0191@outlook.com", [Validators.required]],
      password: ["Esforces0191!@", [Validators.required]],
    });
  }

  public async submitUserLogin(): Promise<void> {
    try {
      const postBody: LoginDto = new LoginDto(
        this.form.get("email")?.value,
        this.form.get("password")?.value,
      );
      const response = await this.loginHttpService.login(postBody);
    } catch (error: any) {
      console.log(error.error.errorMessage);
    }
  }
}
