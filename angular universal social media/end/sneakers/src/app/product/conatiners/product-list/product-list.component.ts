import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
// import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators'; // diff
import { UiService } from '../../../ui/services/ui.service';

@Component({
  selector: 'app-product-list',
  template: `
    <app-products [products]="products"></app-products>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private uiService: UiService // diff
  ) { }

  ngOnInit() {
    // this.service.getProducts()
    //   .subscribe(res => this.products = res);
    this.route.data.pipe(
      map(data => data['products']),
      tap(products => this.metaData(products))
    ).subscribe(
      (res) => this.products = res
    )
  }
  // diff
  metaData(products: Product[]) {
    this.uiService.setMetaData({
      title: 'Products',
      description: 'Check out our sneakers'
    })
  }

}
