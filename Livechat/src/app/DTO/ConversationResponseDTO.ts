import { MessageDTO } from "./MessageDTO";



export class ConversationResponseDTO{

    private id : number = 0;
    private conversationMessages : Array<MessageDTO> = [];
    
    

    public getConversationId(): number {
        return this.id;
    }

    public getMessages(): Array<MessageDTO> {
        return this.conversationMessages;
    }

    public setConversationId(conversationId: number): void {
        this.id = conversationId;
    }
    public setMessages(messages : Array<MessageDTO>){
        this.conversationMessages = messages;
    }

    
}