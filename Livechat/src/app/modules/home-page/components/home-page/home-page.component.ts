import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LivechatUserService } from '../../../../services/livechat-user.service';
import { LivechatUserDTO } from '../../../../DTO/LivechatUserDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public loginMessage : String = ""; 
  private flag : boolean = false;

  private userName : String = ""
  private userPassword : String = "";




  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('' ,[Validators.required])
  });

  constructor(private livechatUserService : LivechatUserService) {

  }


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

  loginformSubmit():void{
    console.log('form');
    

    try {
      this.livechatUserService.requestCredentials(this.loginForm.value);
      

    } catch (error) {
      console.error(error);
      

      
    }
    this.handleloginMessage();
  }


  ngOnInit(): void {
    this.handleloginMessage();
      
  }
}
