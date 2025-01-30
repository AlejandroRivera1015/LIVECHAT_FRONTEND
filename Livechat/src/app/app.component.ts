import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageModule } from './modules/home-page/home-page.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomePageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Livechat';
}
