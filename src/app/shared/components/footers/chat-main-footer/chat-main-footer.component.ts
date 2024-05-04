import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { ChatMainFooterService } from './chat-main-footer.service';

@Component({
  selector: 'app-chat-main-footer',
  templateUrl: './chat-main-footer.component.html',
  styleUrls: ['./chat-main-footer.component.scss'],
  standalone: true,
  imports: [SharedModule, MaterialModule, ReactiveFormsModule]
})
export class ChatMainFooterComponent implements OnInit {
  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chatMainFooterService: ChatMainFooterService
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }

  public async handleInputSend(): Promise<void> {
    if (this.inputForm.valid) {
      this.chatMainFooterService.chatMainFooterInputSubmitSubject.next(this.inputForm.value.input);
      this.inputForm.reset();
    }
  }
}
