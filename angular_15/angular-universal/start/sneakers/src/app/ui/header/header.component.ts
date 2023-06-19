import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <a routerLink="/" class="navbar-brand">
        <img [src]="logo" [alt]="title" width="30" height="30">
        {{title}}
      </a>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <a href="" class="nav-item nav-link" *ngFor="let link of links"
          [routerLink]="link.url" routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: true}">
          {{link.label}}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class HeaderComponent {
  logo = 'https://image.shutterstock.com/image-vector/sneaker-shop-logo-shoes-sign-450w-471891626.jpg';
  title = 'store';
  links = [{
    label: 'Products',
    url: '/products'
  }]
}
