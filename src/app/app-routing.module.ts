import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'catalog/:filter',
    component: CatalogComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
