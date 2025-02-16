import { Injectable } from '@angular/core';
import { LivechatUserDTO } from '../DTO/LivechatUserDTO';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpResponse  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivechatUserService {


  private livechatUserCredentials  = new BehaviorSubject<LivechatUserDTO>(new LivechatUserDTO(1,"")); 
  private livechatUserCredentials$ = this.livechatUserCredentials.asObservable();


  constructor(private httpClient : HttpClient) {  }


  public  requestCredentials(credentials : any):Observable<LivechatUserDTO>{

    const credentialsResponse = new BehaviorSubject<LivechatUserDTO>(new LivechatUserDTO(0,""));

    try {
      this.httpClient.post('https://acceptable-elegance-production.up.railway.app/auth/login',credentials,{observe: "response"})
        .subscribe((response : HttpResponse<any>)=>{
          
          if(response.status == 200){
            console.log("code 200");
            const tempUser = new LivechatUserDTO(response.body.id, response.body.token); // note : important to create a instance of LivechatUserDTO in order to be able to use the methods getId() and getToken()
            this.setUserCredentials(tempUser);
            credentialsResponse.next(new LivechatUserDTO(response.body.id, response.body.token));
            
          }
          else console.log("el estatus es" + response.status);
      
      });
      
    } catch (error) {

    }
    return credentialsResponse.asObservable();

  }

  private setUserCredentials(livechatuser : LivechatUserDTO) {
    console.log(JSON.stringify(livechatuser));
  
    this.livechatUserCredentials.next( livechatuser);
  }

  public getUserCredentials():Observable<LivechatUserDTO>{    
    return this.livechatUserCredentials$;
  }





}


