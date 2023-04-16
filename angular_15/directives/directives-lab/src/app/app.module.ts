import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstDirective } from './first.directive';
import { BasicComponent } from './basic/basic.component';
import { TrackDirective } from './track.directive';
import { OnlineDirective } from './online.directive';
import { ThreeDirective } from './three.directive';
import { MyForDirective } from './my-for.directive';

@NgModule({
  declarations: [
    AppComponent,
    FirstDirective,
    BasicComponent,
    TrackDirective,
    OnlineDirective,
    ThreeDirective,
    MyForDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
