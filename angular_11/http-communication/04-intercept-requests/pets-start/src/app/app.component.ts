import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Pets App</h1>

    <button (click)="fetchPets()">Fetch Pets</button>
    <button (click)="raiseHttpError()">Raise HTTP erros</button>

    <hr>

    List of pets
    <ul>
      <li *ngFor="let pet of pets$ | async">{{pet.name}}</li>
    </ul>
  `,
})
export class AppComponent {
  pets$;

  constructor(private http: HttpClient) {}

  fetchPets() {
    this.pets$ = this.http.get('/api/v1/pets');
  }

  raiseHttpError() {
    this.pets$ = this.http.get('/api/v1/pets/40');
  }
}
