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
export class ConversationsServicesService {


  private userId : number = 0;

  private conversations = new BehaviorSubject<any>([]);
  wsSocket = new WebSocket('ws://localhost:8080/livechat');
  

  constructor(private httpClient : HttpClient, private livechatUserService : LivechatUserService, private livechatUserServices: LivechatUserService) {}

  public setConnetion(): Observable<any> {
    console.log("Setting connection");
        return this.livechatUserService.getUserCredentials().pipe(
          map((response : any) =>{
            this.userId = response.id;
            return(this.userId);
          }
        ));
  } 


  public getAllConversations(userId: string): void {
    this.httpClient.get<any>(`http://localhost:8080/conversations/all?userId=${userId}`,{observe: "response", withCredentials : true}).pipe(
      filter((response: HttpResponse<any>)=>{
        console.log("response: " + response.body);
        
        return response.body ;
      })
    ).subscribe();
  }

  public getConversationById (contactId : number){

    let params = {
      user: this.userId,  
      contactId :contactId
    }

    console.log("Getting conversation with id: " + contactId);
    this.wsSocket.send("hola broo" + JSON.stringify(params));
  }

}