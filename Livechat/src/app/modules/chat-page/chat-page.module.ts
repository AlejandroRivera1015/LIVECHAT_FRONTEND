import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatDisplayComponent } from './components/chat-display/chat-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LivechatUserService } from '../../services/livechat-user.service';
import { AuthGuard } from '../../Config/auth/auth-guard.guard';

export const routes: Routes = [{
  path: '',
  component: ChatDisplayComponent
}]


@NgModule({
  declarations: [ChatDisplayComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),HttpClientModule]

})
export class ChatPageModule { }
