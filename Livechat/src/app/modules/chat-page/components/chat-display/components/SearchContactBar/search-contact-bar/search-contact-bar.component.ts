import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ConversationsServicesService } from '../../../../../../../services/ConversationsServices/conversations-services.service';

@Component({
  selector: 'app-search-contact-bar',
  templateUrl: './search-contact-bar.component.html',
  styleUrl: './search-contact-bar.component.css'
})
export class SearchContactBarComponent  {


  public contactSearch = new BehaviorSubject<{userName : string, userId: number} | null>({userName: "", userId: 0});

  searchContactForm = new FormGroup({
    email : new FormControl('' ,[Validators.required])
  });

  constructor(private httpClient : HttpClient, private conversationsServices : ConversationsServicesService){  }

  public searchContact(): void {
    console.log("Searching for contact with email: " );
    
    this.httpClient.get<any>(`http://localhost:8080/users/find?email=${this.searchContactForm.value.email}`,{observe: "response", withCredentials : true}).subscribe(
      (response) =>{console.log(response);
        this.contactSearch.next(response.body);
      },
    );
  }
  
  public getContactConversation(userId: number): void{
    this.conversationsServices.getConversationById(userId);

  }


}
