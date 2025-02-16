import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LivechatUserService } from '../../../../services/livechat-user.service';
import { LivechatUserDTO } from '../../../../DTO/LivechatUserDTO';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public loginMessage : String = ""; 
  private flag : boolean = false;


  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('' ,[Validators.required])
  });

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
            
        this.livechatUserService.requestCredentials(this.loginForm.value).subscribe((response)=>{
          console.log("la resp del server " + JSON.stringify(response));

          if(response.getToken() != ""){
            console.log("vamos a ruta");
            
            this.router.navigate(['/app']);
          }
          else{
            this.router.navigate(['/login']);

          }

        
          

      });
    }
      
    catch (error) {
      console.error(error);      
    }



      
}



  ngOnInit(): void {
    this.handleloginMessage();
  }
}
