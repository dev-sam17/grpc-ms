require('dotenv').config({ path: './test/.env' });
const mongoose = require('mongoose')
const { Product } = require('../src/db')

const { getProducts,
  getProductById,
  createProduct,
  deleteProductById } = require('../src/products')




describe('Product', () => {
  let productId

  beforeAll(async () => {
    // connecting to test database
    // testDb()
  });

  beforeEach(async () => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Product',
      price: 100,
    })
    const result = await product.save()
    productId = result._id;
  });

  // Remove all test data from the test database after each test
  afterEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should return an array of products from the main database', async () => {
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
    expect(response.price).toBe('100');
  });
});
