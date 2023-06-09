require('dotenv').config({ path: './test/.env' });
const mongoose = require('mongoose')
const { Product } = require('../src/db')

const { createProduct, deleteProductById } = require('../src/products');
const { main, GetProducts, GetProductById, CreateProduct, DeleteProductById } = require('../src/grpc');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
describe('GRPC server', () => {
  let server;
  let productId

  beforeAll(async () => {

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Product',
      price: 100,
    })
    const result = await product.save()
    productId = result._id;

    server = await main()
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
    server.forceShutdown();
  });

  describe('GetProducts', () => {
    test('should return an array of products', async () => {
      const call = {};
      const callback = jest.fn();
      await GetProducts(call, callback);
      expect(callback).toHaveBeenCalledWith(null, { products: expect.any(Array) });
    });
  });

  describe('GetProductById', () => {
    test('should return a product', async () => {
      const call = { request: { id: productId } };
      const callback = jest.fn();
      await GetProductById(call, callback);
      expect(callback).toHaveBeenCalledWith(null, expect.any(Object));
    });
  });

  describe('CreateProduct', () => {
    test('should create a product', async () => {
      const call = { request: { name: 'Test Product', price: 100 } };
      const callback = jest.fn();
      await CreateProduct(call, callback);
      expect(callback).toHaveBeenCalledWith(null, expect.any(Object));
      const product = callback.mock.calls[0][1].product;
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe('100');
      await deleteProductById(product.id); // clean up
    });
  });

  describe('DeleteProductById', () => {
    test('should delete a product', async () => {
      const product = await createProduct('Test Product', 100); // create a product to delete
      const call = { request: { id: product.id } };
      const callback = jest.fn();
      await DeleteProductById(call, callback);
      expect(callback).toHaveBeenCalledWith(null, expect.any(Object));
      const deletedProduct = callback.mock.calls[0][1].deletedproduct;
      expect((deletedProduct.id).toString()).toBe(product.id);
      expect(deletedProduct.name).toBe(product.name);
      expect(deletedProduct.price).toBe((product.price));
    });
  });
});
