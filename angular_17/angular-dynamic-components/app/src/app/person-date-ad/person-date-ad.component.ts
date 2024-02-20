import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-date-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-date-ad.component.html',
  styles: ``
})
export class PersonDateAdComponent {
  @Input() headline!: string;
  @Input() body!: string;
}
