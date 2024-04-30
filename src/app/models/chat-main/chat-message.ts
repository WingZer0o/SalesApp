export class ChatMessage {
    id: number;
    message: string;
    sender: string;
    receiver: string;
    timestamp: Date;
  
    constructor(id: number, message: string, sender: string, receiver: string, timestamp: Date) {
      this.id = id;
      this.message = message;
      this.sender = sender;
      this.receiver = receiver;
      this.timestamp = timestamp;
    }
}