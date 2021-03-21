## Introduction

|              Beer Factory              |               RxJS              |
|:--------------------------------------:|:-------------------------------:|
|            Start the stream            |            Subscribe            |
| Items pass through a set of operations | Pipe through a set of operators |
|             As and Observer            |             Observer            |
|             Stop the stream            |           Unsubscribe           |

## Observer/Subscriber

* As an observer (of a process in a factory)
    - Next item, process it
    - Error occurred, handle it
    - Complete, you're done

* Observer
    - next()
    - error()
    - complete()

* Observer - `Observes the stream and responds to its notifications`

> Definition from `RxJS` official library: "`Observer`: is a collection of callbacks that knows how to listen to values delivered by the Observable."

> JavaScript documentation: "A JavaScript object that defines the handlers for the notifications you receive."

> Angular documentation: In `RxJS`, an `Observer` is also defined as an interface with `next`, `error`, and `complete` methods.

An `observer` is an interface with **next**, **error** and **complete** methods. A classs that implements the observer interface is a `subscriber`.

While `observer` is the class that we use to observe our stream inside RxJS, **each observer is converted to a subscriber**. A `subscriber` is basically an observer with additional features to unsubscribe from an observable.

```ts
const observer = {
    next: beer => console.log(`Beer was emitted ${beer}`),
    error: err => console.log(`Error occurred: ${err}`),
    complete: () => console.log(`No more beers, go home`),
};
```

## Observable Stream (Observable)

In the apple factory, our stream is the beers moving along the conveyor.

In `RxJS`, **the stream of data is called an observable stream**. We emit any type of data into an observable stream, numbers, strings, or events, such as mouse events, key events, value changes, or routing events. We can even emit other observable streams.

* Any stream of data, optionally produced over time
    - Numbers
    - Strings
    - Events
    - Object literals
    - Response returned from an HTTP request
    - Other Observable streams

* Observables can be synchronous, meaning the items are emitted to the stream immediately, or asynchronous, meaning the items are emitted at some future point in time. 

* Observables can emit a finite number of items, such as the numbers in an array, or an infinite number of items, such as a count when a timer goes off every second forever.

```ts
const beerObserver = {
    next: beer => console.log(`beer was emitted ${beer}`),
    error: err => console.log(`Error occurred: ${err}`),
    complete: () => console.log(`No more beers, go home`),
};

const beerStream = new Observable(beerObserver => {
    beerObserver.next('Beer 1');
    beerObserver.next('Beer 2');
    beerObserver.complete();
});
```

In the constructor, we optionally provide a function. The argument passed to this function is the `observer`. The code in the function executes when the stream is started. Here we call next to emit two beer strings to the stream and then complete the stream. 

Will this code emit two beer strings to our stream? Nope. Recall that observables are lazy and don't execute when they are defined.

## Starting the Observable Stream/Subscription

With RxJS, we start the stream by calling the subscribe method of the observable. We must subscribe to an observable to start the stream; otherwise, no values are emitted to the stream, and we have nothing to observe.

```ts
const beerObserver = {
    next: beer => console.log(`beer was emitted ${beer}`),
    error: err => console.log(`Error occurred: ${err}`),
    complete: () => console.log(`No more beers, go home`),
};

const beerStream = new Observable(beerObserver => {
    beerObserver.next('Beer 1');
    beerObserver.next('Beer 2');
    beerObserver.complete();
});

const sub = beerStream.subscribe(observer);
```

To subscribe, we call the subscribe method on the observable, like this. When we subscribe, we pass in an observer to monitor that subscription and react each time an item is emitted, when an error occurs, or when the observable completes. To say this another way, as part of the subscription process, we tell the observable how we will observe it. The subscribe method returns a subscription, which represents the execution of the observable.

So, when you hear the term observer, think set of callbacks to observe, handling next, error, and complete. When you hear the term observable or stream, think sequence of emitted items, and remember that a stream won't start until we subscribe.

We can pass the **next**, **error**, and **complete** methods directly into the **subscribe method**, like this. 

```ts
const stream = new Observable(observer => {
  observer.next("Beer 1");
  observer.next("Beer 2");
  observer.complete();
});

stream.subscribe(
  beer => console.log(`Beer was emitted: ${beer}`),
  err => console.log(`Error occured: ${err}`),
  () => console.log(`No more beers, go home`)
);

```

The first argument is the next method, the second argument the error method, and the third argument is the complete method. Each of these arguments is optional.

## Stopping the Observable Stream

With RxJS, properly stopping each observable stream helps avoid potential memory leaks in our application. 

There are several ways to stop an observable. Calling the complete method of the observer automatically unsubscribes and executes the observer's complete method. Some creation functions and operators, such as `of`, `from`, and `take`, also automatically unsubscribe and execute the observer's complete method.

Any uncaught error executes the observer's error method and unsubscribes without calling the observer's complete method. 

Calling the unsubscribe method on the subscription also stops the stream. Unsubscribing does not call the observer's complete method. It simply lets the stream know that we are no longer interested in observing it, so it shouldn't emit any more items. In all of these cases, the stream stops.

```ts
const sub = appleStream.subsribe(observer);
sub.unsubscribe();
```

Properly unsubscribing from each observable that doesn't complete on its own helps avoid memory leaks in our application. 

```ts
const stream = new Observable(observer => {
  observer.next("Beer 1");
  observer.next("Beer 2");
  observer.complete();
});

const sub = stream.subscribe(
  beer => console.log(`Beer was emitted: ${beer}`),
  err => console.log(`Error occured: ${err}`),
  () => console.log(`No more beers, go home`)
);

sub.unsubscribe();
```

## Creation Functions

Let's say that we have an array 

```ts
const beers = ['Beer 1', 'Beer 2'];

of(beers) // [Beer 1, Beer 2] [1]
from(beers) // Beer 1, Beer 2 [2]
of(...beers); // Beer 1, Beer 2 [3]
```

1. Emits a single value, an array value
2. Emits two values.
3. We achive the same result with `of` by using the spread operator.

We can create an observable from an event

```ts
@ViewChild('par') par: ElementRef;

ngAfterViewInit() {
    const parStream = fromEvent(this.par.nativeElement, 'click')
                        .subscribe(console.log);
}
```

We can use `interval`

```ts
const num = interval(1000).subscribe(console.log);
```

## Creation Functions: Demo

From [stackblitz](https://stackblitz.com/)

```ts
import { Component, VERSION, OnInit } from '@angular/core';
import { of, from } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    of(2, 4, 6, 8).subscribe(console.log);

    from([20, 15, 10, 5]).subscribe(
      item => console.log(`resulting item .. ${item}`),
      err => console.log(`error occured ${err}`),
      () => console.log('complete'),
    );
  }
}

```