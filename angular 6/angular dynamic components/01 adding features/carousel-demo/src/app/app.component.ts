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
  selectedItemId: number;
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

  onCardSelected(todo: Todo): void {
    this.selectedItemId = todo.id;
    this.carouselComponent.activeCarouselItem(todo);
  }

  onAdd(): void {
    const genericTodo = {
      id: Date.now(),
      title: 'Item',
      content: 'Item content',
    };

    this.carouselComponent.addCarouselItem(
      this.itemContentTemplate,
      genericTodo
    )
  }

  onRemove(): void {
    if (!!this.selectedItemId) {
      this.carouselComponent
        .deleteActiveCarouselItem(this.selectedItemId);
      this.resetSelectedItem();
    }
  }

  private resetSelectedItem = () => this.selectedItemId = 0;
}
