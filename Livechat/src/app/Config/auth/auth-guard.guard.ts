import { Injectable } from "@angular/core";
import { CanActivate, Router, Routes } from "@angular/router";
import { LivechatUserService } from "../../services/livechat-user.service";
import { LivechatUserDTO } from "../../DTO/LivechatUserDTO";
import { BehaviorSubject, map, Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private livechatService: LivechatUserService, private router: Router){}

  
    canActivate():Observable<boolean>{

      console.log("guard active");    
     return this.livechatService.getUserCredentials().pipe(
        map((livechatUser: LivechatUserDTO)=>{
          console.log("el dto es " + livechatUser);
          return true;
          
          
        }));
      

     
    }

} 