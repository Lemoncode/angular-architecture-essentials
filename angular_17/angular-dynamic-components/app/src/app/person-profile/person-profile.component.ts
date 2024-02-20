import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-profile.component.html',
  styles: ``
})
export class PersonProfileComponent {
  @Input() name!: string;
  @Input() bio!: string;
}
