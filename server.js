const PROTO_PATH = __dirname + '/products.proto';

const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader');

const ProductsService = require('./products')


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,

  longs: String,

  enums: String,

  defaults: true,

  oneofs: true,
});

const products_proto = grpc.loadPackageDefinition(packageDefinition).product;

// function getProducts(call, callback) {
//     callback(null, ProductsService.getProducts());
//   }

async function getProducts(call, callback) {
    const product = await ProductsService.getProducts();
    callback(null, { product });
}


async function getProductById(call, callback) {
    const id = call.request.id
    const product = await ProductsService.getProductById(id);
    callback(null, { product });
}


async function createProduct(call, callback) {
    const product = await ProductsService.createProduct(call.request.name, call.name.price);
    callback(null, { product });
}

async function deleteProductById(call, callback) {
    const product = await ProductsService.deleteProductById(call.request.id);
    callback(null, { product });
}


function main() {
    const server = new grpc.Server();

    server.addService(products_proto.Products.service, {
        GetProducts: getProducts,
        GetProductById: getProductById,
        CreateProduct: createProduct,
        DeleteProductById: deleteProductById
    });

    server.bindAsync(
        'localhost:3000',
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log("Server started at 'localhost:3000'")
            server.start();
        }
    );
}

main();