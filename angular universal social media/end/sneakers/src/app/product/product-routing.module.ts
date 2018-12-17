import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './conatiners/product-list/product-list.component';
import { ProductDetailsComponent } from './conatiners/product-details/product-details.component';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
  { path: '', component: ProductListComponent, resolve: { products: ProductsResolver } },
  { path: ':id', component: ProductDetailsComponent, resolve: { product: ProductResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
