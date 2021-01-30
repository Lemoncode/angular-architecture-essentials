const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  repo = require('./pets.repository')();

const upload = multer({ dest: 'uploads' });

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

app.post('/api/v1/pets/:id/image', upload.single('image'), (_, res) => {
  res.send(res.file);
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);
