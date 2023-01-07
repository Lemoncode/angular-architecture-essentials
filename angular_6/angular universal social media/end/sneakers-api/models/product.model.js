const products = [
    {
        id: 'A',
        name: 'A',
        description: 'Really cconfortable',
        image: 'https://www.carrile.es/media/catalog/product/cache/1/small_image/442x/9df78eab33525d08d6e5fb8d27136e95/1/1/110327.jpg',
        price: 99,
    },
    {
        id: 'B',
        name: 'B',
        description: 'Really cconfortable',
        image: 'https://www.carrile.es/media/catalog/product/cache/1/small_image/442x/9df78eab33525d08d6e5fb8d27136e95/1/1/110327.jpg',
        price: 109,
    },
    {
        id: 'C',
        name: 'C',
        description: 'Really cconfortable',
        image: 'https://www.carrile.es/media/catalog/product/cache/1/small_image/442x/9df78eab33525d08d6e5fb8d27136e95/1/1/110327.jpg',
        price: 200,
    },
];

const getAll = () => products;

const getById = (id) => products.find(p => p.id === id);

module.exports = {
    getAll,
    getById
};