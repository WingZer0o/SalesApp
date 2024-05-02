export class ChatMessage {
    id: string;
    message: string;
    timestamp: Date;
    isChatBot: boolean;
    chatChannelId: number;
    userId: string;
  
    constructor(id: string, message: string, timestamp: Date, isChatBot: boolean, chatChannelId: number, userId: string) {
      this.id = id;
      this.message = message;
      this.timestamp = timestamp;
      this.isChatBot = isChatBot;
      this.chatChannelId = chatChannelId;
      this.userId = userId;
    }
}