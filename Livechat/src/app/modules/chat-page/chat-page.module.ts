import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatDisplayComponent } from './components/chat-display/chat-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConversationsDisplayComponent } from './components/chat-display/components/conversations-display/conversations-display.component';
import { SearchContactBarComponent } from './components/chat-display/components/SearchContactBar/search-contact-bar/search-contact-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesDisplayComponent } from './components/chat-display/components/messages-display/messages-display.component';
import { InputComponent } from './components/chat-display/components/input/input.component';
import { TopChatSectionComponent } from './components/chat-display/components/top-chat-section/top-chat-section.component';

export const routes: Routes = [{
  path: '',
  component: ChatDisplayComponent
}]


@NgModule({
  declarations: [ChatDisplayComponent,ConversationsDisplayComponent, SearchContactBarComponent,MessagesDisplayComponent, InputComponent,TopChatSectionComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),HttpClientModule,ReactiveFormsModule]

})
export class ChatPageModule { }
