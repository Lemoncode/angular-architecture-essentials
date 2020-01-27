import {
  Component,
  ViewChild,
  AfterContentInit,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CarouselComponent } from './components/carousel/carousel.component';
import { Todo } from './todo/todo.model';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  @ViewChild('itemContent') itemContentTemplate;
  @ViewChild(CarouselComponent) carouselComponent: CarouselComponent;
  $todos: Observable<Todo[]>

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.$todos = this.todoService.getTodos();
  }

  ngAfterContentInit(): void {
    this.$todos.subscribe((ts) => {
      ts.forEach((t) => {
        this.carouselComponent
          .addCarouselItem(
            this.itemContentTemplate,
            t
          );
      });
    });
  }
}
