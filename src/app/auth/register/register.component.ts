import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonTitle, IonToolbar, IonHeader, IonContent, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { MaterialModule } from 'src/app/modules/material.module';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonToolbar, IonTitle, ReactiveFormsModule, MaterialModule ]
})
export class RegisterComponent implements OnInit {

  @ViewChild('titleWriter', {static: true})
  titleWriter!: ElementRef;

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    const textWriter = new Typewriter(this.titleWriter.nativeElement, {loop: false});
    textWriter.typeString("Register Your Account");
    textWriter.start();
  }

  public handleRegisterUser(): void {
  }
}