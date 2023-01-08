const pets = [
    {
        id: 1,
        name: 'lax',
        spicies: 'dog',
    },
    {
        id: 2,
        name: 'sax',
        spicies: 'dog',
    },
    {
        id: 3,
        name: 'snowball',
        spicies: 'cat',
    },
];

const delayResolver = (delay) => (resolve, result) =>
(setTimeout(() => {
    resolve(result);
}, delay));

module.exports = (delay = 1000) => {
    const delayResolverInit = delayResolver(delay);
    return {
        getAllPets: () => (
            new Promise(
                (res, _) => delayResolverInit(res, pets)
            )
        ),
        getPetById: (id) => (
            new Promise((res, _) => {
                const result = pets.find(p => p.id === id);
                delayResolverInit(res, result);
            })
        ),
        getPetsBySpicies: (spicies) => (
            new Promise((res, _) => {
                const result = pets.filter(p => p.spicies === spicies);
                delayResolverInit(res, result);
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