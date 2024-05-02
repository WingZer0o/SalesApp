import { ChatMessage } from "./chat-message";

export class ChatChannelResponseDto {
    public channelId: number;
    public chatMessages: ChatMessage[];

    constructor(channelId: number, chatMessages: ChatMessage[]) {
        this.channelId = channelId;
        this.chatMessages = chatMessages;
    }
}