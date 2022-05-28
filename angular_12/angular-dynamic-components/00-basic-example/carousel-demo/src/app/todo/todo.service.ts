import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
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
