import { Injectable } from '@angular/core';
import { LivechatUserDTO } from '../DTO/LivechatUserDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivechatUserService {
  livechatUser  = new BehaviorSubject<LivechatUserDTO>(new LivechatUserDTO(0,""));

  constructor(private httpClient : HttpClient) {  }


  public requestCredentials(credentials : any):Observable<LivechatUserDTO>{
    console.log(this.httpClient.post<LivechatUserDTO>('http://localhost:8080/auth/login',credentials));

    try {
      console.log('el service');
      this.httpClient.post<any>('http://localhost:8080/auth/login',credentials).subscribe((data) => {
        console.log(data);
        this.livechatUser.next(data);
      });

      
    } catch (error) {
      console.error(error);
    }
    return new Observable<LivechatUserDTO>();
  }
}
