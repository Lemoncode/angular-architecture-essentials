const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  repo = require('./pets.repository')();

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Handle errors
app.get('/api/v1/pets', async (_, res) => {
  const result = await repo.getAllPets();
  res.json(result);
});

app.get('/api/v1/pets/:id', async (req, res) => {
  const result = await repo.getPetById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json('No pet');
  }
});

app.get('/api/v1/pets/spicy/:name', async (req, res) => {
  const result = await repo.getPetsBySpicy(req.params.name);
  res.json(result);
});

app.post('/api/v1/pets', async (req, res) => {
  const pet = req.body; // TODO: Validate pet fields
  const result = await repo.addPet(pet);
  res.json(result);
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);
