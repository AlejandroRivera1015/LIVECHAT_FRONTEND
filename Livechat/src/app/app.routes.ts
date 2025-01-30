import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule)
}];
