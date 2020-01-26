# Pets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# In this demo we are going to observe progress of http requests. 

* We have created a new endpoint server, where the files will be placed.
* This new endpoint it's created with `multer`

```javascript
app.post('/api/v1/pets/:id/image', upload.single('image'), (_, res) => {
  res.send(res.file);
});
```
* Also we have created a new entry that will allow us upload a file.

* With this on place we can start by changing our service to handle the upload of files. 


```diff
import { Injectable } from '@angular/core';
import {
  HttpClient,
+ HttpRequest,
+ HttpEvent
} from '@angular/common/http';
import {
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  retryWhen,
  delay,
  flatMap
} from 'rxjs/operators';

import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) { }

  fetchPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(
      `${this.baseUrl}/${id}`
    ).pipe(
      // retry(3)
      retryWhen((err) => {
        let retries = 3;
        return err.pipe(
          delay(1000),
          flatMap((error) => {
            if (retries-- > 0) {
              return of(error)
            } else {
              return throwError(error)
            }
          })
        )
      })
    );
  }

+ uploadPetImage(id, data): Observable<HttpEvent<Object>> {
+   const req = new HttpRequest(
+     'POST',
+     `${this.baseUrl}/${id}/image`,
+     data,
+     { reportProgress: true }
+   );
+
+   return this.http.request(req);
+ }
}

```
* We already have the function to upload the file.

* Now we can use it in our `app.component.ts`

```typescript app.component.ts
import { Component } from '@angular/core';
import { PetsService } from './pets.service';
/*diff*/
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li
      (click)="fetchPet(pet.id)"
      *ngFor="let pet of pets">{{pet.name}}
      </li>
    </ul>

    <hr>

    <span>{{selectedPet?.name}}</span>
    <p *ngIf="message">
      {{message}}
    </p>

    <hr>

    <input type="file" #fileUpload>
    <button (click)="uploadImage(fileUpload)">Upload</button>
    <p *ngIf="progress">
     {{progress}}
    </p>
  `
})
export class AppComponent {
  pets;
  selectedPet;
  message;
  progress;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets()
      .subscribe((result) => {
        this.pets = result;
        this.pets.push({
          id: Date.now(),
          name: 'Unknown',
          spicy: 'Unknown'
        });
      });
  }

  fetchPet(id: string) {
    this.petsService.fetchPetById(id)
      .subscribe(
        (result) => this.selectedPet = result,
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            this.message = `An error occured ${err.error.message}`;
          } else {
            this.message = `Backend returned error code ${err.status}`;
          }
        }
      );
  }
  /*diff*/
  uploadImage(fileUpload) {
    const formData = new FormData();
    formData.append('image', fileUpload.files[0], 'image.jpg');
    this.petsService.uploadPetImage(
      this.selectedPet.id,
      formData
    ).subscribe((res) => {
      if (res.type === HttpEventType.UploadProgress) {
        const percentage = Math.round(100 * res.loaded / res.total);
        this.progress = `File is ${percentage}% uploaded`;
      } else if (res instanceof HttpResponse) {
        this.progress = 'File uploaded complete';
      }
    })
  }
}

```
* Now we can test how uplad works.
