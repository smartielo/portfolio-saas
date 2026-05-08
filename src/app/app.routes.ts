import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { LinksPageComponent } from './pages/links-page/links-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'links',
    component: LinksPageComponent
  }
];
