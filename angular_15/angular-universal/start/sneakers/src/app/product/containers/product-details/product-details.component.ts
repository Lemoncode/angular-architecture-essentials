import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  template: `
    <app-product [product]="product" [details]="true"></app-product>
  `,
  styles: [],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data['product']))
      .subscribe((res) => (this.product = res));
  }
}
