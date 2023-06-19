import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { productsResolver } from './resolvers/products.resolver';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { productResolver } from './resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { products: productsResolver },
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    resolve: { product: productResolver }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
