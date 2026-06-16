## Introduction

* Items are piped through a set of operators
* An operator is a function
* Used to transform and manipulate items in an Observable stream
* Apply operators in sequence using the Observable's pipe method

```ts
of(2, 4, 6) // [1]
    .pipe( // [2]
        map(item => item * 2), // [4]
        tap(console.log), // [4] 
        take(2), // [4]
    ).subscribe(console.log); // [3]
```

1. Our original observable is the source observable. 
2. We use the `pipe` method on this observable. 
3. When we subscribe, the source observable stream starts emitting items.
4. Each item is piped through the series of operators in sequence. 

You can think of your operators as a pipeline, performing a defined set of operations.

The [official docs](https://rxjs.dev/guide/v6/pipeable-operators). If we are confused about what to use, there's a cool feature on this site [Operator Decision Tree](https://rxjs.dev/operator-decision-tree)

## RxJS Operator: map

* Transforms each emitted item

```ts
map(item => item * 2);
```

* For each item in the source, one mapped item is emitted
* Used for 
    - Making changes to each item

```ts
of(2, 4, 6)
    .pipe(
        map(item => item * 2)
    ).subsribe(console.log);
```

> TODO: Add marble diagram resource

* map **is a transformation operator**
    - Takes in an input stream, subscribes
    - Creates an output stream
* When an item is emitted
    - Item is transformed as specified by a provided function
    - Item is emitted to the output stream

    ## RxJS Operator: tap

* Taps into a stream without modufying it

```ts
tap(item => console.log(item))
```

* Used for
    - Debugging
    - Performing actions outside of the flow of data

```ts
of(2, 4, 6)
    .pipe(
        tap(item => console.log(item)),
        map(item => item * 2),
        tap(item => console.log(item)),
        map(item => item - 3),
        tap(item => console.log(item)),
    ).subscribe();
```

> Ask for the output

* tap **is a utility operator**
    - Takes in an input stream, subscribes
    - Creates an output stream
* When an item is emitted 
    - Performs a side effect as specified by a provided function
    - Item is emitted to the output stream

## RxJS Operator: take

* Emits a specified number of items 

```ts
take(2)
```

* Used for
    - Taking a specified number of items
    - Limiting unlimited streams

```ts
of(2, 4, 6)
    .pipe(
        take(2)
    ).subscribe(console.log); // 2 4
```

> What is the output of the following operation?

```ts
of(2, 4, 6)
    .pipe(
        tap(item => console.log(item)),
        map(item => item * 2),
        take(2),
        map(item => item - 3),
        tap(item => console.log(item)),
    ).subscribe();
```

> Explain marble diagram

* take **is a filtering operator**
    - Takes in an input stream, subscribes
    - Creates an output stream
* **When an item is emitted**
    - Counts the item
        * Id <= specified number, emits item to the output stream
        * When it equals the specified number, it completes
* Only emits the defined number of items

## RxJS Operator: Demo

From Stackblizt

```ts
import { Component, VERSION, OnInit } from "@angular/core";
import { of, from } from "rxjs";
import { map, tap, take } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  ngOnInit() {
    of(2, 4, 6, 8).subscribe(console.log);


    from([20, 15, 10, 5])
      /*diff*/
      .pipe(
        tap(console.log),
        map(item => item * 2),
        map(item => item - 10),
        map(item => {
          if (item === 0) {
            throw new Error("zero detected");
          }
          return item;
        }),
        take(3)
      )
      /*diff*/
      .subscribe(
        item => console.log(`resulting item .. ${item}`),
        err => console.log(`error occured ${err}`),
        () => console.log("complete")
      );
  }
}

```

## Operator Internals

### map Operator Internals

```ts
import { Observable } from 'rxjs';

export function map(fn) {
    return (input) => 
        new Observable(observer => {
            return input.subscribe({
                next: value => observer.next(fn(value)),
                error: err => observer.error(err),
                complete: () => observer.complete()
            });
        });
}
```