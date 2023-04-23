require('dotenv').config();
const mongoose = require('mongoose')
const Product = require('../model');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { promisify } = require('util');
const { createProduct, deleteProductById, getProducts, getProductById } = require('../products');
const { GetProducts, GetProductById, CreateProduct, DeleteProductById } = require('../server');

const packageDefinition = protoLoader.loadSync('C:/Users/samro/Desktop/grpc-ms/products.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const products_proto = grpc.loadPackageDefinition(packageDefinition).product;

describe('GRPC server', () => {
  let server;
  let productId

  beforeAll(async () => {
    const mongoUrl = 'mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority'
        mongoose.connect(mongoUrl)
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            price: 100,
        })
        const result = await product.save()
        productId = result._id;

    server = new grpc.Server();
    server.addService(products_proto.Products.service, {
      GetProducts,
      GetProductById,
      CreateProduct,
      DeleteProductById,
    });
    await promisify(server.bindAsync).bind(server)('localhost:5000', grpc.ServerCredentials.createInsecure());
    server.start();
  });

  afterAll(async () => {
    await Product.deleteMany({});
    
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
      expect(product.price).toBe(100);
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
      expect(deletedProduct.price).toBe(product.price);
    });
  });
});
