require('dotenv').config();
const mongoose = require('mongoose')
const Product = require('../model');
const { getProducts,
	getProductById,
	createProduct,
	deleteProductById} = require('../products')

describe('Product', () => {
    let productId;

    beforeAll(async () => {
        // Change to test database
        // Add a product to the database for testing
        const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'
        mongoose.connect(mongoUrl)

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
        })
        const result = await product.save()
        productId = result._id;
    }, 5000);

    afterAll(async () => {
        // Clean up the database after testing
        await Product.deleteMany({});
        await mongoose.connection.close();
    }, 5000);

    test('getProducts should return an array of products', async () => {
        const response = await getProducts();
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBe(true);
    });

      test('getProductById should return a product with the specified ID', async () => {
        const response = await getProductById(productId);
        expect(response).toBeDefined();
        expect(response.message).toBe('Product Found');
        expect(response.product).toBeDefined();

        expect(response.product.id).toEqual(productId);
        expect(response.product.name).toEqual('Test Product');
        expect(response.product.price).toEqual('100');
      });

      test('getProductById should return an error message for an invalid ID', async () => {
        const response = await getProductById('Invalid-ID');
        console.log('response', response);
        expect(response).toBeDefined();
        expect(response.message).toBe('Invalid ID provided');
      });

      test('getProductById should return an error message for an invalid ID', async () => {
        const response = await getProductById('64468f4e5d1599663fd78f25');
        console.log('response', response);
        expect(response).toBeDefined();
        expect(response.message).toBe('No valid Entry Found ');
      });

      test('createProduct should create a new product', async () => {
        const response = await createProduct('New Product', 199.99);
        console.log('response', response);

        expect(response).toBeDefined();
        expect(response._id).toBeDefined();
        expect(response.name).toBe('New Product');
        expect(response.price).toBe('199.99');
      });

      test('deleteProductById should delete the specified product', async () => {
        const response = await deleteProductById(productId);
        expect(response).toBeDefined();
        expect(response.id).toStrictEqual(productId);
        expect(response.name).toBe('Test Product');
        // Change to string
        expect(response.price).toBe(100);
      });
});
