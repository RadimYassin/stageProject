import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import  LayoutComponent  from './shared/components/layout/layout.component';
import  DashboardComponent from './business/dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { AddClientPageComponent } from './add-client-page/add-client-page.component';
import { StockComponent } from './stock/stock.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'listclient',
        component: ClientComponent,
      },
      {
        path: 'client',
        component: AddClientPageComponent,
      },
      {
        path: 'stock',
        component:StockComponent ,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
