import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LivechatUserService } from '../../../../services/livechat-user.service';
import { Router } from '@angular/router';
import { LivechatUserDTO } from '../../../../DTO/LivechatUserDTO';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit , OnDestroy {

  public loginMessage : String = ""; 
  private flag : boolean = false;

  private  livechatUserServiceObservable : Observable<LivechatUserDTO> = new Observable<LivechatUserDTO>();

  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('' ,[Validators.required])
  });

  private destroy$ = new Subject<void>();

  constructor(private livechatUserService : LivechatUserService, private router : Router) {}


  handleloginMessage():void{

    let tempMessage : String  = "" ;
    this.loginMessage = "";
    
    tempMessage = !this.flag ? "Welcome to LiveChat! :D" : "Please, \n try again ! :C";

    setTimeout(()=>{
        for(let i = 0; i < tempMessage.length; i++){
          setTimeout(()=>{
            this.loginMessage = this.loginMessage + tempMessage[i];
          },i*10);
        }
        this.flag = true;
    },200);

  }


  
  loginformSubmit(){

    try {

      this.livechatUserService.requestCredentials(this.loginForm.value).pipe(
        takeUntil(this.destroy$))
          .subscribe(
              ((livechatUser : LivechatUserDTO) => {
                if(livechatUser.getToken() == ""){
                  this.router.navigate(['/login']);
                }
                else{
                  this.router.navigate(['/app']);
                }
              })
            
            );
        
    }
    catch (error) {
      console.error(error);      
    }      
}


  ngOnInit(): void {
    this.handleloginMessage();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }





}
