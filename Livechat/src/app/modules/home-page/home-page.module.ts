import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LivechatUserService } from '../../services/livechat-user.service';


export const routes: Routes = [{
  path: '',
  component: HomePageComponent


}]

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,RouterModule.forChild(routes)],
  providers: [LivechatUserService]
})
export class HomePageModule { }
