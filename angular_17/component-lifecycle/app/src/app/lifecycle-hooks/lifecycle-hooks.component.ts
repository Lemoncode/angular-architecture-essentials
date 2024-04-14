import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Lifecycle Hooks</h2>
    <app-child></app-child>
  `,
  styles: ``,
})
export class LifecycleHooksComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  innerState = 0;
  constructor() {
    setInterval(() => {
      this.innerState += 1;
    }, 3_000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.runningTime('ngOnChanges');
  }

  ngOnInit(): void {
    this.runningTime('ngOnInit');
  }

  ngDoCheck(): void {
    this.runningTime('ngDoCheck');
  }

  ngAfterContentInit(): void {
    this.runningTime('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.runningTime('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    this.runningTime('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    this.runningTime('ngAfterViewChecked');
  }

  private runningTime(hook: string): void {
    console.log(`${hook}`, Date.now());
  }
}
