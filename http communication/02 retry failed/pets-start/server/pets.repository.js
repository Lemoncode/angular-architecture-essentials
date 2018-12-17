const pets = [
  {
    id: 1,
    name: 'lax',
    spicy: 'dog',
  },
  {
    id: 2,
    name: 'sax',
    spicy: 'dog',
  },
  {
    id: 3,
    name: 'snowball',
    spicy: 'cat',
  },
];

const delayResolver = (delay) => (result, resolve) =>
  (setTimeout(() => {
    resolve(result);
  }, delay));

module.exports = (delay = 1000) => {
  const delayResolverInit = delayResolver(delay);
  return {
    getAllPets: () => (
      new Promise(
        (res, _) => delayResolverInit(pets, res)
      )
    ),
    getPetById: (id) => (
      new Promise((res, _) => {
        const result = pets.find(p => p.id === +id);
        delayResolverInit(result, res);
      })
    ),
    getPetsBySpicy: (spicy) => (
      new Promise((res, _) => {
        const result = pets.filter(p => p.spicy === spicy);
        delayResolverInit(result, res);
      })
    ),
    addPet: (pet) => (
      new Promise((res, _) => {
        pet.id = Date.now();
        pets.push(pet);
        delayResolverInit(pet, res)
      })
    ),
  };
};
