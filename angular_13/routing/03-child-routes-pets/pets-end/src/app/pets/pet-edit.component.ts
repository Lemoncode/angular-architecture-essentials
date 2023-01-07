import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-edit',
  template: `
    <ul class="menu">
     <li>
      <a [routerLink]="['info']">Info</a>
     </li>
     <li>
      <a [routerLink]="['toys']">Toys</a>
     </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .menu {
      background-color: pink;
      display: flex;
      justify-content: space-between;
    }
    .menu li {
      list-style-type: none;
    }
  `]
})
export class PetEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
