import { Routes } from '@angular/router';
import { AuthGuard } from './Config/auth/auth-guard.guard';

export const routes: Routes = [
    {
    path: 'login',
    loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule)
    },
    {
        path: 'app',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/chat-page/chat-page.module').then(m => m.ChatPageModule)
    }
];
