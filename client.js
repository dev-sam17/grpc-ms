const PROTO_PATH = __dirname + '/products.proto';

const parseArgs = require('minimist');

const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,

  longs: String,

  enums: String,

  defaults: true,

  oneofs: true,
});

const product_proto = grpc.loadPackageDefinition(packageDefinition).product;

const client = new product_proto.Products('localhost:3000', grpc.credentials.createInsecure());

module.exports = client

                                    