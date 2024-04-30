import { NgModule } from "@angular/core";
import { ChatTimestampPipe } from "../shared/pipes/chat-timestamp.pipe";

const pipes = [
    ChatTimestampPipe
]

@NgModule({
  declarations: [...pipes],
  exports: [
    ...pipes
  ],
})
export class SharedModule {}
