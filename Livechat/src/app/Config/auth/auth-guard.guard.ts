import { Injectable } from "@angular/core";
import { CanActivate, Router, Routes } from "@angular/router";
import { LivechatUserService } from "../../services/livechat-user.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private livechatService: LivechatUserService, private router: Router){}
  
    canActivate():boolean{

      if(this.livechatService.validateCredentials()){
        return true;
      }else{
        console.log("holaas");
        
        this.router.navigate(['/login']);
        return false;
      }
   
    }
} 