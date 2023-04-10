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

function getProducts(call, callback) {
    callback(null, ProductsService.getProducts());
  }


function main() {
    const server = new grpc.Server();

    server.addService(products_proto.Products.service, { GetProducts: getProducts });

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