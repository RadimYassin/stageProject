import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import  LayoutComponent  from './shared/components/layout/layout.component';
import  DashboardComponent from './business/dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { AddClientPageComponent } from './add-client-page/add-client-page.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';

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
        path: 'listProduct',
        component:ProductComponent ,
      },
      {
        path: 'addProduct',
        component:AddProductComponent ,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
