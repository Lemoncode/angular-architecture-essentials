## Dynamic component adding functionality demo

* In this demo we're going to add functionality to our dynamic component.

### Step 1. Our dynamic component is working but if we open the developer tools we will find out that there's an error related with we don't have define onCardSelect. Lets start by adding this feature.


```diff app.component.ts
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
+ selectedItemId: number;
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

+  onCardSelected(todo: Todo): void {
+    this.selectedItemId = todo.id;
+  }
}

```

* If we run our app no error should be display on console.

* What we want is to active the carousel item when we select so right now this functionality is not implemented yet so lets change this.

* Edit _app/components/carousel/carousel.component.ts_


```typescript
import {
  Component,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { DynamicCarouselItemAnchorDirective } from '../dynamic-carousel-item-anchor.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild(DynamicCarouselItemAnchorDirective) dynamicPlaceHolder: DynamicCarouselItemAnchorDirective;
  items: CarouselItemComponent[] = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  addCarouselItem(template, data) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(CarouselItemComponent);
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance: CarouselItemComponent = componentRef.instance as CarouselItemComponent;
    instance.template = template;
    instance.dataContext = data;
    this.items.push(instance);
  }
  /*diff*/
  activeCarouselItem(item) {
    this.resetActiveCarouselItems();
    this.items
      .find((i) => i.dataContext.id === item.id)
      .toggleActive();
  }

  private resetActiveCarouselItems = () => (
    this.items.forEach((i) => i.active = false)
  );
  /*diff*/
}

```

* Now we can go back to _app/app.component.ts_ and use this new functionality

```diff
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
+   this.carouselComponent.activeCarouselItem(todo);
  }
}

```

### Step 2. We do not worried about styles lets chnge that.

* Edit _app/components/carousel.component.css_

```css
.carousel-container {
  list-style: none;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
```

* Edit _app/app.component.css_

```css
.carousel-item {
  box-sizing: content-box;
  padding: 0.2rem;
  background-color: rgba( lightgrey, 1.0);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  min-width: 300px;
}

.carousel-item.carousel-item-header {
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
}

.actions {
  display: flex;
  justify-content: center;
}

.action.actions-item {
  margin-right: 1rem;
}

```

* Lets add global styles, edit _src/styles.css_

```css
html, body { height: 100%; }
body { margin: 0; font-family: 'Roboto', sans-serif; }

```

### Step 3. For las we're going the ability to add and remove items from the ui.

* Edit _app/app.component.html_ as follows:

```diff
<h2 style="text-align: center">Custom component demo</h2>
+<div class="actions">
+   <span class="actions actions-item" (click)="onAdd()">Add</span>
+   <span class="actions actions-item" (click)="onRemove()">Remove</span>
+</div>
<app-carousel>
</app-carousel>
<!-- This is just a reference that we can grab it later -->
<ng-template #itemContent let-card="data">
  <li class="carousel-item">
      <h3 class="carousel-item carousel-item-header">{{card?.title}}</h3>
      <div (click)="onCardSelected(card)">
          {{card?.content}}
      </div>
  </li>
</ng-template>
```

* Edit _app/app.component.ts_

```typescript
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
  /*diff*/
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
      
    }
  }
  /*diff*/
}

```
* Lets check that add works

* We can't implement remove yet, we need to add this functionlity to _app/components/carousel.component.ts_

```typescript
import {
  Component,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { DynamicCarouselItemAnchorDirective } from '../dynamic-carousel-item-anchor.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild(DynamicCarouselItemAnchorDirective) dynamicPlaceHolder: DynamicCarouselItemAnchorDirective;
  items: CarouselItemComponent[] = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  addCarouselItem(template, data) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(CarouselItemComponent);
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance: CarouselItemComponent = componentRef.instance as CarouselItemComponent;
    instance.template = template;
    instance.dataContext = data;
    this.items.push(instance);
  }

  activeCarouselItem(item) {
    this.resetActiveCarouselItems();
    this.items
      .find((i) => i.dataContext.id === item.id)
      .toggleActive();
  }

  private resetActiveCarouselItems = () => (
    this.items.forEach((i) => i.active = false)
  );

  deleteActiveCarouselItem(id: number) {
    const activeIndex = this.items.findIndex(i => i.dataContext.id === id && i.active); // [1]
    this.items.splice(activeIndex, 1);
    
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer; // [2]
    viewContainerRef.remove(activeIndex);
  }
}

```
1. Fetch the instance that have to be removed
2. To ensure we have destroy our component we have to get a reference to the view container ref and remove it from here.

* Now we can edit _app/app.component.ts_

```diff
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
+     this.carouselComponent
+       .deleteActiveCarouselItem(this.selectedItemId);
+     this.resetSelectedItem();
    }
  }

+ private resetSelectedItem = () => this.selectedItemId = 0;
}

```
