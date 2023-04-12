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

async function GetProducts(call, callback) {
    const products = await ProductsService.getProducts();
    callback(null, { products });
}

async function GetProductById(call, callback) {
    const id = call.request.id
    const response = await ProductsService.getProductById(id);
    console.log('server ')
    callback(null, response);
}


async function CreateProduct(call, callback) {
    const name = call.request.name
    const price = call.request.price
    const product = await ProductsService.createProduct(name, price);
    callback(null, { product });
}

async function DeleteProductById(call, callback) {
    const product = await ProductsService.deleteProductById(call.request.id);
    callback(null, { product });
}


function main() {
    const server = new grpc.Server();

    server.addService(products_proto.Products.service, {
        GetProducts,
        GetProductById,
        CreateProduct,
        DeleteProductById
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
