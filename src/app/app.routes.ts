import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feedback',
    loadComponent: () => import('./components/feedback/feedback').then((m) => m.Feedback),
  },
  {
    path: 'conference',
    loadComponent: () =>
      import('./components/conference-talk-proposal/conference-talk-proposal').then(
        (m) => m.ConferenceTalkProposal
      ),
  },
  {
    path: 'customer',
    loadComponent: () => import('./components/customer/customer').then((m) => m.Customer),
  },
  {
    path: '',
    redirectTo: '/customer',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/customer',
  },
];
