import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event } from '@ionic/pwa-elements/dist/types/stencil-public-runtime';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';

@Component({
  selector: 'app-add-chat-channel',
  templateUrl: './add-chat-channel.component.html',
  styleUrls: ['./add-chat-channel.component.scss'],
  standalone: true,
  imports: [MaterialModule, SharedModule, ReactiveFormsModule]
})
export class AddChatChannelComponent  implements OnInit {

  @Output()
  public addChatChannelEvent: EventEmitter<string> = new EventEmitter<string>(); 

  public addChatChannelForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<AddChatChannelComponent>
  ) { }

  ngOnInit() {
    this.addChatChannelForm = this.formBuilder.group({
      channelName: ['', Validators.required]
    });
  }

  public addChatChannel(): void {
    if (!this.addChatChannelForm.valid) {
      return;
    }
    const chatChannelName = this.addChatChannelForm.get('channelName')?.value;
    this.addChatChannelEvent.emit(chatChannelName);
    this.dialogRef.close();
  }
}
