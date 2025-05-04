import { Component, OnInit } from '@angular/core';
import { LivechatUserService } from '../../../../../../services/livechat-user.service';
import { ConversationsServicesService } from '../../../../../../services/ConversationsServices/conversations-services.service';
import { filter, map, Observable } from 'rxjs';
import { ConversationResponseDTO } from '../../../../../../DTO/ConversationResponseDTO';
import { LivechatUserDTO } from '../../../../../../DTO/LivechatUserDTO';
import { Notification } from '../../../../../../utils/classes/Notification';
import { MessageDTO } from '../../../../../../DTO/MessageDTO';

@Component({
  selector: 'app-messages-display',
  standalone: false,
  templateUrl: './messages-display.component.html',
  styleUrl: './messages-display.component.css'
})
export class MessagesDisplayComponent implements OnInit {

  public userConversations$: Observable<ConversationResponseDTO[]> = new Observable();
  public actualConversation: number = 0;
  public userId : number = 0;

  public notificacions : Notification[] = [];

  constructor(private livechatUserService: LivechatUserService, private conversationsService: ConversationsServicesService) { }

  ngOnInit() {

    this.livechatUserService.getUserCredentials().subscribe((user : LivechatUserDTO) =>{
      this.userId = user.getId();
    });

    this.conversationsService.wsSocket.onmessage = (event) => {
      let converstionResponse  = JSON.parse(event.data);
      

      let conversation = new ConversationResponseDTO();
      conversation.setConversationId(converstionResponse.id);

     let messages : MessageDTO[] = converstionResponse.conversationMessages.map((message : any)=>{
      return new MessageDTO(message.id,message.message,message.sender, message.receiver,message.createAt);
     });

    conversation.setMessages(messages);
      this.conversationsService.updateConversation(conversation);
      let notificacion = new Notification(conversation.getConversationId(), false);
      this.notificacions.push(notificacion);

    }



    this.conversationsService.actualConversation.subscribe((conversationId: number) => {
      this.userConversations$ = this.conversationsService.getAllConversations().pipe(
        map((conversations: ConversationResponseDTO[]) => {
          return conversations.filter((conversation: ConversationResponseDTO) => {;     
            return conversation.getConversationId() == conversationId ?  conversation : null;
          })
        })
      )
      
    });
    }
}

