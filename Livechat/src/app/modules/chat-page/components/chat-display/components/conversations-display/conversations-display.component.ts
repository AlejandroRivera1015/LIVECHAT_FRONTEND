import { Component, OnInit } from '@angular/core';
import { LivechatUserService } from '../../../../../../services/livechat-user.service';
import { ConversationsServicesService } from '../../../../../../services/ConversationsServices/conversations-services.service';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { LivechatUserDTO } from '../../../../../../DTO/LivechatUserDTO';
import { ConversationResponseDTO } from '../../../../../../DTO/ConversationResponseDTO';

@Component({
  selector: 'app-conversations-display',
  templateUrl: './conversations-display.component.html',
  styleUrls: ['./conversations-display.component.css'],
})

export class ConversationsDisplayComponent implements OnInit {

  constructor(private conversationsServices : ConversationsServicesService, private livechatUserService : LivechatUserService) {}

  public conversations = new BehaviorSubject<ConversationResponseDTO[]>([]);
  public livechatUserID : number  = 0 ;



  getUserImage(){
    this.conversationsServices.getUserImage();
  }

  selectedConversation(conversationId: number){
    this.conversationsServices.actualConversation.next(conversationId);
    this.conversationsServices.getContactByConversationId(conversationId);  
    this.conversationsServices.actualContact.subscribe((contactId: number)=>{
      this.conversationsServices.getContactNamebyId(contactId);  
    });
    
  }


  ngOnInit() {
        this.livechatUserService.getUserCredentials().subscribe((livechatuser : LivechatUserDTO)=>{
          this.livechatUserID = livechatuser.getId();

        });


        this.conversationsServices.setConnetion().subscribe((userId : any) => {
          this.conversationsServices.setAllConversations(userId);
          this.conversationsServices.getAllConversations().subscribe((connversations : any) => {
            this.conversations.next(connversations);
          });
        }
        );

        this.conversationsServices.actualConversation.subscribe((conversationId : number) => {
//          this.conversationsServices.getContactByConversationId(conversationId);

        })

    }
    

}

