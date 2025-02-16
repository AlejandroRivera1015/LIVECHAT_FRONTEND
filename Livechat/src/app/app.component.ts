import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageModule } from './modules/home-page/home-page.module';
import { ChatPageModule } from './modules/chat-page/chat-page.module';
import { LivechatUserService } from './services/livechat-user.service';
import { AuthGuard } from './Config/auth/auth-guard.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomePageModule,ChatPageModule],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Livechat';
}

