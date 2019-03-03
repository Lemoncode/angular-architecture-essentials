import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
