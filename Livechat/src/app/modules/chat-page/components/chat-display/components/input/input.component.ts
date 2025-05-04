import { Component, OnInit } from '@angular/core';
import { ConversationsServicesService } from '../../../../../../services/ConversationsServices/conversations-services.service';
import { map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ConversationResponseDTO } from '../../../../../../DTO/ConversationResponseDTO';
import { MessageDTO } from '../../../../../../DTO/MessageDTO';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {

  private contactId: number = 0;

  constructor(private conversationsServices: ConversationsServicesService) { }

  sendMessage = new FormGroup({
    message: new FormControl('')
  });


  handleContact() {
    console.log("handle contact");


  }

  handleSendMessage() {
    
    if (this.sendMessage.value.message != null && this.sendMessage.value.message != "") {
      this.conversationsServices.wsSocket.send(JSON.stringify({
        "message": this.sendMessage.value.message,
        "sender": this.conversationsServices.getUserId(),
        "receiver": this.conversationsServices.actualContact.getValue(),
      }));
      this.sendMessage.reset();
    }
  }


  ngOnInit(): void {

  }

}
