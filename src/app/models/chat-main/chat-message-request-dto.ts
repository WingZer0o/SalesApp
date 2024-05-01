export class ChatMessageRequestDto {
    message: string;
    chatChannelId: number;

    constructor(message: string, chatChannelId: number) {
      this.message = message;
      this.chatChannelId = chatChannelId;
    }
}