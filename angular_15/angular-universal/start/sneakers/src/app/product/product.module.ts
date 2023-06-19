import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
