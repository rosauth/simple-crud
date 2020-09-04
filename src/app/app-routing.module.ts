import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeProductComponent } from './pages/home-product/home-product.component';

const routes: Routes = [
  {path: "home", component: HomeProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
