import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feedback',
    loadComponent: () => import('./components/feedback/feedback').then((m) => m.Feedback),
  },
  {
    path: '',
    redirectTo: '/feedback',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/feedback',
  },
];
