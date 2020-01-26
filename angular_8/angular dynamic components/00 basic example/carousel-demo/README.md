## Dynamic component demo

* In this demo we're going to build a dynamic component that will load its items from a external source.

### Step 1. We're going to setup models and mock service to emulate a external data feeder.

* Create _todo.module_

```bash
$ ng g m todo --skipTests
```

* Create _todo/todo.model.ts_

```typescript
export interface Todo {
    id: number;
    title: string;
    content: string;
}
```

* Create _todo/todo.service.ts_

```bash
$ ng g s todo/todo --spec=false
```

* Edit _todo/todo.module.ts_

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*diff*/
import { TodoService } from './todo.service';
/*diff*/

@NgModule({
  imports: [
    CommonModule
  ],
  /*diff*/
  providers: [
    TodoService
  ]
  /*diff*/
})
export class TodoModule { }
```

* Edit _todo/todo.service.ts_ as follows:

```typescript
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {

  constructor() { }

  getTodos() : Observable<Todo[]> {
    return of([
      {
        id: 1,
        title: 'Groceries',
        content: 'Buy lettuce',
      },
      {
        id: 2,
        title: 'Supplies',
        content: 'Buy hammer',
      }
    ]);
  }  
}

```


### Step 2. Now we're going to create a new module for our dynamic component and the realted components to get dynaic behavior

* First we create a new module

```bash
$ ng g m components --spec=false
```
* Now lets create our _carousel component_, it's going to be a simple unordered list, but the point here, is that the items could be added dynamically.

```bash
$ ng g c components/carousel --module=components.module --spec=false
```

* Lets start edit its template _app/components/carousel.component.hml_

```html
<ul class="carousel-container">
    <ng-template appDynamicCarouselItemAnchor></ng-template>
</ul>
```

* We're using _ng-template_, this directive represents an Angular template: this means that the content of this tag will contain part of a template, that can be then be composed together with other templates in order to form the final component template.

* If we use directly _ng-template_ will not render. This is because with the ng-template tag we are simply defining a template, but we are not using it yet.

* To use we have to make a reference to a external link. This is way we have here _appDynamicCarouselItemAnchor_. Is just a direcive that will point out where the template is. We can simply use a template variable instead the directive.

* Lets create this directive

```bash
$ ng g d components/dynamic-carousel-item-anchor --module=components --spec=false
```

* Edit _app/components/dynamic-carousel-item-anchor.ts_

```typescript
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicCarouselItemAnchor]'
})
export class DynamicCarouselItemAnchorDirective {

  constructor(public viewContainer: ViewContainerRef) { }

}

```


* At this point can create our _carousel item_

```bash
$ ng g c components/carousel-item --module=components --spec=false
```
* Edit _app/components/carousel-item.component.html_ as follows:

```html
<div [class.active]="active" class="portrait">
  <ng-container 
  [ngTemplateOutlet]="template"
  [ngTemplateOutletContext]="{data: dataContext}"></ng-container>
</div>
```

* For rendering an external template, we need a new tag, which is the so-called ng-container.A container allows us to basically use its property, which is called ngTemplateOutlet, and assign ita template, which gets passed in as a reference from the outside.

* ngTemplateOutletContext allow us feed it with data.

* Edit _app/components/carousel-item.component.ts_ as follows:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent {
  @Input() template;
  @Input() dataContext;
  active = false;

  toggleActive() {
    this.active = true;
  }
}
```

* Now our carousel-item component is ready to accept such a template from the outside, and a data context.

* Notice that we have added method to toggle active.

* Edit _app/components/carousel-item.component.css_ as follows:

```css
.portrait {
    padding: 0.5rem;
}

.active {
    box-sizing: border-box;
    border: 0.2px solid gray;
    padding: 0;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,1);
    margin: 0.5rem;
}
```
* Ok with this on place we can start to build _app/components/carousel.component.ts_

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
    private componentFactoryResolver: ComponentFactoryResolver // [1]
  ) { }

  addCarouselItem(template, data) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(CarouselItemComponent);
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer; // [2]

    const componentRef = viewContainerRef.createComponent(componentFactory); // [3]
    const instance: CarouselItemComponent = componentRef.instance as CarouselItemComponent;
    instance.template = template; //[4]
    instance.dataContext = data;
    this.items.push(instance); // [5]
  }
}


```
1. This service will let us instantiate new components
2. This is our anchor, the place where our new components will get render. Is just a reference.
3. We create a component reference.
4. We can grab the instance of the component's reference and feed it with the template and data that we desire.
5. For last we feed this array with the new component created, this way we can track them.

* Before going further we have to update _app/components/components.module.ts_

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { DynamicCarouselItemAnchorDirective } from './dynamic-carousel-item-anchor.directive';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CarouselComponent,
    DynamicCarouselItemAnchorDirective,
    CarouselItemComponent
  ],
+ exports: [
+   CarouselComponent,
+   CarouselItemComponent,
+ ],
+ entryComponents: [
+   CarouselItemComponent // [1]
+ ]
})
export class ComponentsModule { }

```
1. Since is not referenced on template we have to load on imperatively way.

### Step 3. Now we have all the pieces to start working with our dynamic component. Lets test it.

* First we have to edit _app/app.module.ts_

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
+import { ComponentsModule } from './components/components.module';
+import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   ComponentsModule,
+   TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

* Edit _app/app.component.html_ as follows

```html
<h2 style="text-align: center">Custom component demo</h2>

<app-carousel>
  <app-carousel-item [template]="itemContent" [dataContext]="todo"></app-carousel-item>
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

* Edit _app/app.component.ts_ as follows:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo = {
    title: 'Foo Title',
    content: 'Foo Content',
  };
}
```

* If we run this nothing will desplayed, remember we need to include the carousel items usin our anchor reference _appDynamicCarouselItemAnchor_. To demonstrate that is working edit _app/components/carousel/carousel.component.html_ as follows:

```html
<ul class="carousel-container">
  <!-- diff -->
  <ng-content></ng-content>
  <!-- diff -->
  <ng-template appDynamicCarouselItemAnchor></ng-template>
</ul>
```

* Ok, know we're going to inject data dynamically, lets edit _app/app.component.ts_ to achieve this.

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
  @ViewChild('itemContent') itemContentTemplate; // [1]
  @ViewChild(CarouselComponent) carouselComponent: CarouselComponent; // [2]
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

```
1. A reference to our template
2. A reference to our carousel component.

* Remove _ng-content_ from _app/components/carousel/carousel.component.html_

```diff
<ul class="carousel-container">
- <ng-content></ng-content>
  <ng-template appDynamicCarouselItemAnchor></ng-template>
</ul>
```
* And edit _app/app.component.html_

```diff
<h2 style="text-align: center">Custom component demo</h2>

<app-carousel>
-  <app-carousel-item [template]="itemContent" [dataContext]="todo"></app-carousel-item>
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
* Lets check that is working
