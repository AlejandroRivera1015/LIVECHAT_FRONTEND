import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LivechatUserService } from '../../../../services/livechat-user.service';
import { Router } from '@angular/router';
import { LivechatUserDTO } from '../../../../DTO/LivechatUserDTO';
import { BehaviorSubject, filter, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

  private sessionStatus = new BehaviorSubject<number>(0);

  public loginMessage: String = "";
  public flag = new BehaviorSubject<boolean>(false);
  private livechatUserServiceObservable: Observable<LivechatUserDTO> = new Observable<LivechatUserDTO>();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required])
  });

  private destroy$ = new Subject<void>();

  constructor(private livechatUserService: LivechatUserService, private router: Router) { }


  public handleloginMessage(): void {
    let tempMessage: String ;
    this.loginMessage = "";

    if(!this.flag.getValue()){
       tempMessage = "Welcome to LiveChat! :D";;
    }    
    else{
      tempMessage = "";
      this.loginMessage = "";
      if (this.sessionStatus.getValue() == 404) {
        tempMessage = "Please, \n try again \n user or pswd ! :C";
      }

      if (this.sessionStatus.getValue() == 500) {
        tempMessage = "Server  \n unavailable! D:";
      }

      if (this.sessionStatus.getValue() == 503) {
        tempMessage = "Please try again later!";
      }


    }

    setTimeout(() => {
      for (let i = 0; i < tempMessage.length; i++) {
        setTimeout(() => {
          this.loginMessage = this.loginMessage + tempMessage[i];
        }, i * 20);
      }
    }, 300);
  }

  
  public loginformSubmit() {

    try {
      this.livechatUserService.requestCredentials(this.loginForm.value).pipe(
        takeUntil(this.destroy$))
        .subscribe(
          ((livechatUser: LivechatUserDTO) => {
            if (livechatUser.getToken() == "") {
              this.router.navigate(['/login']);
            }
            else {
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
    this.livechatUserService.sessionHandler.subscribe((sessionStatus: number) => {
      if (sessionStatus != 200 && sessionStatus != 0) {
        this.flag.next(true);
        this.sessionStatus.next(sessionStatus);       
      }
    });

    this.flag.subscribe((flag: boolean)=>{
      this.handleloginMessage();
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }





}
