import { Component } from '@angular/core';
import { TrackingService } from './tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'directives-lab';
  message = 'Hola';
  one = {message: 'Hello one'};
  two = {message: 'Hello two'};
  three = {message: 'Hello three'};
  items = [
    {
      name: 'Foo'
    }
  ]
}
