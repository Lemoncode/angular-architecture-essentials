import { inject } from '@angular/core';
import {
  ResolveFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

export const productsResolver: ResolveFn<Product[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProductsService).getProducts();
};
