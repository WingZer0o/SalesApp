export class ChatMessage {
    id: number;
    message: string;
    sender: string;
    receiver: string;
    timestamp: Date;
    isChatBot: boolean;
  
    constructor(id: number, message: string, sender: string, receiver: string, timestamp: Date, isChatBot: boolean = false) {
      this.id = id;
      this.message = message;
      this.sender = sender;
      this.receiver = receiver;
      this.timestamp = timestamp;
      this.isChatBot = isChatBot;
    }
}