import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, switchMap, take, takeUntil } from 'rxjs';
import { LivechatUserService } from '../livechat-user.service';
import { LivechatUserDTO } from '../../DTO/LivechatUserDTO';
import { ConversationResponseDTO } from '../../DTO/ConversationResponseDTO';
import { UserImage } from '../../utils/classes/UserImage';
import { Notification } from '../../utils/classes/Notification';
import { MessageDTO } from '../../DTO/MessageDTO';

@Injectable({
  providedIn: 'root'
})

export class ConversationsServicesService {

  private userId: number = 0;
  private conversations = new BehaviorSubject<ConversationResponseDTO[]>([]);
  public actualConversation = new BehaviorSubject<number>(0);
  public actualContact = new BehaviorSubject<number>(0);
  public contactName = new BehaviorSubject<string>("contact");
  public contactImg = new BehaviorSubject<string>("")
  public wsSocket = new WebSocket('ws://localhost:8080/livechat');
  public userImgsArray: UserImage[] = [];

  private notificationsArray = new BehaviorSubject<Notification[]>([]);
  





  constructor(private httpClient: HttpClient, private livechatUserService: LivechatUserService) { }

  public setConnetion(): Observable<number> {
    console.log("Setting connection");
    return this.livechatUserService.getUserCredentials().pipe(
      map((response: any) => {
        this.userId = response.id;
        return response.id;

      }
      ));
  }
 //TODO: HANDLE NOTIFICACIONS
  public setNotificationArray(notificacionArray : Notification[]) :void{
    this.notificationsArray.next(notificacionArray);
  }

  public getNotificationArray() : Observable<Notification[]> {
    return this.notificationsArray.asObservable();
  }

  public getUserId(): number {
    return this.userId;
  }


 //TODO: HANDLE SETIMAGES
  public getUserImage(): void {


    if (this.userImgsArray.length == 0) {
      this.httpClient.get<any>(`http://localhost:8080/user/getUserImg?id=${this.actualContact.getValue()}`, { observe: "response", withCredentials: true, responseType : "text" as "json" }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            this.userImgsArray.push(new UserImage(this.actualContact.getValue(), response.body));
            this.contactImg.next(response.body);
            
          }
     

        }
      );
    }
    else {
      this.userImgsArray.forEach((userImage: UserImage) => {
        if (userImage.getUserId() == this.actualContact.getValue()) {
        }
        else {
          this.httpClient.get<any>(`http://localhost:8080/user/getUserImg?id=${this.actualContact.getValue()}`, { observe: "response", withCredentials: true }).subscribe(
            (response: HttpResponse<any>) => {
              if (response.status == 200) {
                this.userImgsArray.push(new UserImage(this.actualContact.getValue(), response.body));
                return response.body.toString();
              }
            })
        }
      });
    }
  }



  public getContactByConversationId(conversationId: number) : void {
  this.httpClient.get<any>(`http://localhost:8080/conversations/participants?conversationId=${conversationId}`, { observe: "response", withCredentials: true }).subscribe(
    (response: HttpResponse<any>) => {
      if (response.status == 200) {
        let participants: number[] = response.body;

        participants.forEach((participantId: number) => {
          participantId == this.userId ? null : this.actualContact.next(participantId);
        });

      }
    }
  );

}

  public getContactNamebyId(contactId: number){

  this.httpClient.get<any>(`http://localhost:8080/user/getUserName?userId=${contactId}`, { observe: "response", withCredentials: true, responseType: "text" as "json" }).subscribe(
    (response: HttpResponse<any>) => {
      if (response.status == 200) {
        let contactName: string = response.body;
        this.contactName.next(contactName);
      }
    }
  );

}


 
  public setAllConversations(userId: string): void {

  this.httpClient.get<any>(`http://localhost:8080/conversations/all?userId=${userId}`, { observe: "response", withCredentials: true }).subscribe((response: HttpResponse<any>) => {

    let conversations: ConversationResponseDTO[] = response.body.map((data: any) => {

      
      let conversation = new ConversationResponseDTO();
      conversation.setConversationId(data.id);

      let messages : MessageDTO[] = data.conversationMessages.map((message : any) => {
        
        let MessageDTOResponse = new MessageDTO(message.id, message.message, message.sender, message.receiver);
        return MessageDTOResponse;
      });


      conversation.setMessages(messages);

      let incomingConversation = new ConversationResponseDTO();
      incomingConversation.setConversationId(conversation.getConversationId());
      incomingConversation.setMessages(conversation.getMessages());
      return incomingConversation;
    });

    this.conversations.next(conversations);

  });
}

    public getAllConversations(): Observable < ConversationResponseDTO[] > {
  return this.conversations.asObservable();
}

public getConversationById(contactId : number){
  let ConversationRequestDTO = {
    responseType: "GET_CONVERSATIONS",
    participants: [this.userId, contactId]
  }
  console.log("Getting conversation with id: " + contactId);
  this.wsSocket.send(JSON.stringify(ConversationRequestDTO));
}


public updateConversation(conversationResponse: ConversationResponseDTO) : void {
  let newConversationsArray = new Array<ConversationResponseDTO>();

  this.conversations.subscribe(
    (conversations: ConversationResponseDTO[]) => {
      newConversationsArray = conversations.map((conversation: ConversationResponseDTO) => {
        if ((conversation.getConversationId() !== null) && (conversation.getConversationId() == conversationResponse.getConversationId())) {
          conversation.setMessages(conversationResponse.getMessages());
        }
        return conversation;

      });
    }
  );
  this.conversations.next(newConversationsArray);


}

  
}