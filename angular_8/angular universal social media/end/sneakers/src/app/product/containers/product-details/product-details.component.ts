import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  template: `
    <app-product [product]="product" [details]="true"></app-product>
  `,
  styles: []
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  constructor(
    private route: ActivatedRoute,
    // private service: ProductService
  ) { }

  ngOnInit() {
    // this.service.getProduct(
    //   this.route.snapshot.paramMap.get('id')
    // ).subscribe(res => this.product = res);
    this.route.data.pipe(
      map(data => data['product'])
    ).subscribe(res => this.product = res);
  }

}
