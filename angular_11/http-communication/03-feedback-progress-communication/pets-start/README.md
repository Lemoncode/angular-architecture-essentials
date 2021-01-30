# Pets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Update Server

```bash
$ npm i multer -D
```

Update `pets-start/server/index.js` with a new endpoint

```js
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  /*diff*/
  multer = require('multer'),
  /*diff*/
  repo = require('./pets.repository')();

/*diff*/
const upload = multer({ dest: 'uploads' });
/*diff*/

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Handle errors
app.get('/api/v1/pets', async (_, res, next) => {
  const result = await repo.getAllPets();
  res.json(result);
  next();
});

app.get('/api/v1/pets/:id', async (req, res, next) => {
  const result = await repo.getPetById(req.params.id);
  if (!result) {
    res.status(404);
  } else {
    res.json(result);
  }
  next();
});

app.get('/api/v1/pets/spicies/:name', async (req, res, next) => {
  const result = await repo.getPetsBySpicies(req.params.name);
  if (!result) {
    res.status(404);
  } else {
    res.json(result);
  }
  next();
});

app.post('/api/v1/pets', async (req, res, next) => {
  const pet = req.body; // TODO: Validate pet
  const result = await repo.addPet(pet);
  res.json(result);
  next();
});

/*diff*/
app.post('/api/v1/pets/:id/image', upload.single('image'), (_, res) => {
  res.send(res.file);
});
/*diff*/

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);

```

