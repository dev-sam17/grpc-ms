const mongoose = require('mongoose');
const Product = require('./product');
const mongoUrl = 'mongodb://localhost:27017/test';

const { getProducts } = require('../products');

describe('Product model', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Product.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should save a product to the database', async () => {
    const product = new Product({
      name: 'Test product',
      price: 10,
    });
    await product.save();

    const savedProduct = await Product.findById(product._id);
    expect(savedProduct.name).toEqual('Test product');
    expect(savedProduct.price).toEqual(10);
  });

  it('should return an array of products with name, price, and id', async () => {
    const product1 = new Product({
      name: 'Product 1',
      price: 10,
    });
    const product2 = new Product({
      name: 'Product 2',
      price: 20,
    });
    await Promise.all([product1.save(), product2.save()]);

    const response = await getProducts();
    expect(response).toEqual([
      { name: 'Product 1', price: '10', id: product1._id },
      { name: 'Product 2', price: '20', id: product2._id },
    ]);
  });
});
