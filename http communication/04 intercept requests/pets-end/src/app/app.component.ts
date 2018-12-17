import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h1>Pets app</h1>

    <button (click)="fetchPets()">Fetch pets</button>
    <button (click)="raiseHttpError()">Raise http error</button>

    <hr />

    List of pets
    <ul>
      <li *ngFor="let pet of pets$ | async">{{pet.name}}</li>
    </ul>
  `
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
