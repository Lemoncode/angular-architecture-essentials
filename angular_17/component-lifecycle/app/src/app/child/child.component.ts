import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [ParentComponent],
  template: ` <p>I'm a child component, an this is my text: {{ text }}</p> `,
  styles: ``,
})
export class ChildComponent implements OnInit, AfterViewInit {
  @Input() text = '';

  constructor(private parent: ParentComponent) {}

  ngOnInit(): void {
    // setTimeout(() => {
    // });
    this.parent.text = 'updated text';
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    // });
    this.parent.name = 'updated name';
  }
}
