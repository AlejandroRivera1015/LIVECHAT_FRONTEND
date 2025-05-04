import { Component, OnInit } from '@angular/core';
import { ConversationsServicesService } from '../../../../services/ConversationsServices/conversations-services.service';
import { LivechatUserService } from '../../../../services/livechat-user.service';
import { LivechatUserDTO } from '../../../../DTO/LivechatUserDTO';
import { switchMap } from 'rxjs';
import { ConversationsDisplayComponent } from './components/conversations-display/conversations-display.component';

@Component({
  selector: 'app-chat-display', 
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.css',
})
export class ChatDisplayComponent implements OnInit {

  constructor(private conversationServices : ConversationsServicesService, private livechatUserService: LivechatUserService) { }

  

  ngOnInit(): void {
      

  }


}


