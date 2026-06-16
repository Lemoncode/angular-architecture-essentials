## Working with the Async Pipe

### Async Pipe

We access an observable directly in a template using the `async pipe`. The `async pipe` **automatically subscribes to the observable when the component is initialized**. It returns each emitted value from that observable. 

When a new item is emitted, the component is marked to be checked for changes and runs change detection, modifying the UI as needed. This makes the async pipe a key part of our reactive development strategy. And the async pipe automatically unsubscribes when the component is destroyed to avoid potential memory leaks.

```
"beers$ | async"
```

### Common Pattern with Async Pipe

```ts
class {
    beers: Beer[] = [];

    constructor(private beerService: BeerService) {}

    ngOnInit() {
        this.beerService.getBeers()
            .subscribe(beers => this.beers = beers);
    }
}

```

```ts
class {
    beers$: Observable<Beer[]>;

    constructor(private beerService: BeerService) {}

    ngOnInit() {
       this.beers$ = this.beerService.getBeers();;
    }
}
```

### Template with an Async Pipe

```html
<div *ngIf="beers">
    <table>
        <tr *ngFor="let beer of beers">
            <td>{{ beer.beerName }}</td>
        </tr>
    </table>
</div>
```

```html
<div *ngIf="beers$ | async as beers">
    <table>
        <tr *ngFor="let beer of beers">
            <td>{{ beer.productName }}</td>
        </tr>
    </table>
</div>
```