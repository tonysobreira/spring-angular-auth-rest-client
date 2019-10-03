import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthGuard } from './auth/auth.guard';

import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    data: { title: 'Edit Article' }
  },
  {
    path: 'addproduct',
    canActivate: [AuthGuard],
    component: AddProductComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
