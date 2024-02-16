import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-toys',
  template: `
  <h3>Pet toys</h3>
  <p *ngFor="let toy of toys">
    {{ toy }}
  </p>
  `,
  styles: [
  ]
})
export class PetToysComponent {
  @Input() toys: any;
}
