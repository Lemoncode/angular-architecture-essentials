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

