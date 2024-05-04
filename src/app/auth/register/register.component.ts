import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import { RegisterUserRequestDto } from "src/app/models/register/register-user-dto";
import { MaterialModule } from "src/app/modules/material.module";
import { AuthGuardService } from "src/app/services/http/auth-guard.service";
import { RegisterHttpService } from "src/app/services/http/register-http.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerHttpService: RegisterHttpService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}

  ngOnInit() {// check if token exists in local storage. If it does, navigate to chat screen
    if (this.authGuardService.isTokenPresent()) {
      this.router.navigateByUrl("/chat");
    }
    this.form = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  public async handleRegisterUser(): Promise<void> {
    try {
      if (this.form.valid) {
        this.isLoading = true;
        let dto = new RegisterUserRequestDto(
          this.form.get("email")?.value,
          this.form.get("password")?.value,
        );
        const response = await this.registerHttpService.registerUser(dto);
        this.form.reset();
        this.isLoading = false;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
