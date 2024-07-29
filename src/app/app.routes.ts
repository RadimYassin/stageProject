import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.default),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.default),
      },
      {
        path: 'vente',
        loadComponent: () => import('./vente/vente.component').then(m => m.VenteComponent),
      },
      {
        path: 'NouvelleLivraison',
        loadComponent: () => import('./add-client-page/add-client-page.component').then(m => m.AddClientPageComponent),
      },

    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
