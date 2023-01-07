const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  repo = require('./pets.repository')();

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Handle errors
app.get('/api/v1/pets', async (_, res, next) => {
  const result = await repo.getAllPets();
  res.json(result);
  next();
});

app.get('/api/v1/pets/:id', async (req, res, next) => {
  const result = await repo.getPetById(req.params.id);
  res.json(result);
  next();
});

app.get('/api/v1/pets/spicy/:name', async (req, res, next) => {
  const result = await repo.getPetsBySpicy(req.params.name);
  res.json(result);
  next();
});

app.post('/api/v1/pets', async (req, res, next) => {
  const pet = req.body; // TODO: Validate pet
  const result = await repo.addPet(pet);
  res.json(result);
  next();
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);
