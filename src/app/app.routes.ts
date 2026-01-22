import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'productos',
    loadComponent: () => import('./product-list/product-list').then(m => m.ProductList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
