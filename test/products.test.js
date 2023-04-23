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
        expect(response.product.id).toStrictEqual(productId);
      });

      // test('getProductById should return an error message for an invalid ID', async () => {
      //   const response = await getProductById('invalid-id');
      //   expect(response).toBeDefined();
      //   expect(response.message).toBe(expect.anything());
      // });

      test('createProduct should create a new product', async () => {
        const response = await createProduct('New Product', 200);
        expect(response).toBeDefined();
        expect(response._id).toBeDefined();
        expect(response.name).toBe('New Product');
        expect(response.price).toBe(200);
      });

      test('deleteProductById should delete the specified product', async () => {
        const response = await deleteProductById(productId);
        expect(response).toBeDefined();
        expect(response.id).toStrictEqual(productId);
        expect(response.name).toBe('Test Product');
        expect(response.price).toBe(100);
      });
});
