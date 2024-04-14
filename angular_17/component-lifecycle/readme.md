# Component Lifecycle

A component's lifecycle is the sequence of steps that happen between the component's creation and its destruction. Each step represents a different part of Angular's process for rendering components and checking them for updates over time.

In your components, you can implement lifecycle hooks to run code during these steps. Lifecycle hooks that relate to a specific component instance are implemented as methods on your component class. Lifecycle hooks that relate the Angular application as a whole are implemented as functions that accept a callback.

A component's lifecycle is tightly connected to how Angular checks your components for changes over time. For the purposes of understanding this lifecycle, you only need to know that Angular walks your application tree from top to bottom, checking template bindings for changes. The lifecycle hooks described below run while Angular is doing this traversal. This traversal visits each component exactly once, so you should always avoid making further state changes in the middle of the process.

| **Phase**        | **Method**              | **Summary**                                                               |
| ---------------- | ----------------------- | ------------------------------------------------------------------------- |
| Creation         | `constructor`           | Runs when Angular instantiates the component.                             |
| Change Detection | `ngOnInit`              | Runs once after Angular has initialized all the component's inputs.       |
| Change Detection | `ngOnChanges`           | Runs every time the component's inputs have changed.                      |
| Change Detection | `ngDoCheck`             | Runs every time this component is checked for changes.                    |
| Change Detection | `ngAfterViewInit`       | Runs once after the component's view has been initialized.                |
| Change Detection | `ngAfterContentInit`    | Runs once after the component's content has been initialized.             |
| Change Detection | `ngAfterViewChecked`    | Runs every time the component's view has been checked for changes.        |
| Change Detection | `ngAfterContentChecked` | Runs every time this component content has been checked for changes.      |
| Rendering        | `afterNextRender`       | Runs once the next time that all components have been rendered to the DOM |
| Rendering        | `afterRender`           | Runs every time all components have been rendered to the DOM.             |
| Destruction      | `ngOnDestroy`           | Runs once before the component is destroyed                               |

## ngOnInit

The `ngOnInit` method runs after Angular has initialized all the components inputs with their initial values. A component's `ngOnInit` runs exactly once.

This step happens before the component's own template is initialized. **This means that you can update the component's state based on its initial input values.**

## ngOnChanges

The `ngOnChanges` method runs after any component inputs have changed.

This step happens _before_ the component's own template is checked. **This means that you can update the component's state based on its initial input values.**

During initialization, the first `ngOnChanges` runs before ngOnInit.

## ngOnDestroy

The ngOnDestroy method runs once just before a component is destroyed. Angular destroys a component when it is no longer shown on the page, such as being hidden by `NgIf` or upon navigating to another page.

### DetroyRef

As an alternative to the `ngOnDestroy` method, you can inject an instance of `DestroyRef`. You can register a callback to be invoked upon the component's destruction by calling the onDestroy method of `DestroyRef`.

```ts
@Component({
  /* ... */
})
export class UserProfile {
  constructor(private destroyRef: DestroyRef) {
    destroyRef.onDestroy(() => {
      console.log("UserProfile destruction");
    });
  }
}
```

You can pass the `DestroyRef` instance to functions or classes outside your component. Use this pattern if you have other code that should run some cleanup behavior when the component is destroyed.

You can also use `DestroyRef` to keep setup code close to cleanup code, rather than putting all cleanup code in the `ngOnDestroy` method.

## ngDoCheck

The `ngDoCheck` method runs before every time Angular checks a component's template for changes.

You can use this lifecycle hook to manually check for state changes outside of Angular's normal change detection, **manually updating the component's state.**

This method runs very frequently and can significantly impact your page's performance. Avoid defining this hook whenever possible, only using it when you have no alternative.

During initialization, the first `ngDoCheck` runs after `ngOnInit`.

## ngAfterViewInit

The `ngAfterViewInit` method runs once after all the children in the component's template (its _view_) have been initialized.

You can use this lifecycle hook to read the results of [view queries](https://angular.dev/guide/components/queries#view-queries). While you can access the initialized state of these queries, attempting to change any state in this method results in an [ExpressionChangedAfterItHasBeenCheckedError](https://angular.dev/errors/NG0100)

## ngAfterContentInit

The `ngAfterContentInit` method runs once after all the children nested inside the component ( its _content_) have been initialized.

You can use this lifecycle hook to read the results of [content queries](https://angular.dev/guide/components/queries#content-queries). While you can access the initialized state of these queries, attempting to change any state in this method results in an [ExpressionChangedAfterItHasBeenCheckedError](https://angular.dev/errors/NG0100)

## ngAfterViewChecked

The `ngAfterViewChecked` method runs every time the children in the component's template (its _view_) have been checked for changes.

This method runs very frequently and can significantly impact your page's performance. Avoid defining this hook whenever possible, only using it when you have no alternative.

While you can access the updated state of [view queries](https://angular.dev/guide/components/queries#view-queries) here, attempting to change any state in this method results in an [ExpressionChangedAfterItHasBeenCheckedError](https://angular.dev/errors/NG0100).

## ngAfterContentChecked

The `ngAfterContentChecked` method runs every time the children nested inside the component (its _content_) have been checked for changes.

This method runs very frequently and can significantly impact your page's performance. Avoid defining this hook whenever possible, only using it when you have no alternative.

While you can access the updated state of [content queries](https://angular.dev/guide/components/queries#content-queries) here, attempting to change any state in this method results in an [ExpressionChangedAfterItHasBeenCheckedError](https://angular.dev/errors/NG0100).

## afterRender and afterNextRender

The `afterRender` and `afterNextRender` functions let you register a **render callback** to be invoked after Angular has finished rendering all components on the page into the DOM.

These functions are different from the other lifecycle hooks described in this guide. Rather than a class method, they are standalone functions that accept a callback. The execution of render callbacks are not tied to any specific component instance, but instead an application-wide hook.

`afterRender` and `afterNextRender` must be called in an [injection context](https://angular.dev/guide/di/dependency-injection-context), typically a component's constructor.

You can use render callbacks to perform manual DOM operations. See [Using DOM APIs](https://angular.dev/guide/components/dom-apis) for guidance on working with the DOM in Angular.

Render callbacks do not run during server-side rendering or during build-time pre-rendering.

## afterRender phases

> TODO: Complete notes over https://angular.dev/guide/components/lifecycle#afterrender-phases

## Execution order

### Initialization

- https://angular.dev/guide/components/lifecycle
