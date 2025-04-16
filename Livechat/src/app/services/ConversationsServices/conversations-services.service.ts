import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, switchMap, take, takeUntil } from 'rxjs';
import { LivechatUserService } from '../livechat-user.service';
import { LivechatUserDTO } from '../../DTO/LivechatUserDTO';

@Injectable({
  providedIn: 'root'
})

export class ConversationsServicesService  {

  private userId : number = 0;
  private conversations = new BehaviorSubject<any>([]);
  public actualConversation = new BehaviorSubject<number>(0);
  public actualContact = new BehaviorSubject<number>(0);
  public wsSocket = new WebSocket('ws://localhost:8080/livechat');


  
  constructor(private httpClient : HttpClient, private livechatUserService : LivechatUserService) {}

  public setConnetion(): Observable<number> {
      console.log("Setting connection");
        return this.livechatUserService.getUserCredentials().pipe(
          map((response : any) =>{
            this.userId = response.id;
            return response.id;
    
          }
        ));
        
  } 

  public getUserId(): number {
    return this.userId;
  }

  public setAllConversations(userId: string): void {
    
    this.httpClient.get<any>(`http://localhost:8080/conversations/all?userId=${userId}`,{observe: "response", withCredentials : true}).subscribe((response: HttpResponse<any>) => {
      console.log("Conversations response: " + JSON.stringify(response.body));
      this.conversations.next(response.body);
      
    });
  }

    public getAllConversations(): Observable<any> {
      return this.conversations.asObservable();
    }

public getConversationById (contactId : number){
    let ConversationRequestDTO = {
        responseType: "GET_CONVERSATIONS",
        participants: [this.userId, contactId]
    }
    console.log("Getting conversation with id: " + contactId);
    this.wsSocket.send(JSON.stringify(ConversationRequestDTO));
  }

  //TODO: implement this function
  public updateConversation(){

  }

}