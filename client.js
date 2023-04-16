
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/products.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const product_proto = grpc.loadPackageDefinition(packageDefinition).product;

const client = new product_proto.Products('localhost:3000', grpc.credentials.createInsecure());

// get products
function GetProducts() {
  return new Promise((resolve, reject) => {
      client.GetProducts({}, (error, response) => {
          if (response) {
              resolve(response)
          } else {
              reject(error)
          }
      })
  })
}

// get product by id
function GetProductById(id) {
  return new Promise((resolve, reject) => {
      client.GetProductById({id:id}, (error, response) => {
          if (response) {
              resolve(response)
          } else {
              reject(error)
          }
      })
  })
}

// create product
function CreateProduct(name, price) {
  return new Promise((resolve, reject) => {
      client.CreateProduct({name: name,
      price: price}, (error, response) => {
          if (response) {
              resolve(response)
          } else {
              reject(error)
          }
      })
  })
}

// delete product by id
function DeleteProduct(id) {
  return new Promise((resolve, reject) => {
      client.DeleteProductById({id: id}, (error, response) => {
          if (response) {
              resolve(response)
          } else {
              reject(error)
          }
      })
  })
}

module.exports = {
  GetProducts,
  GetProductById,
  CreateProduct,
  DeleteProduct
}

                                    