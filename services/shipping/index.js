const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/shipping.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const shippingProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do ShippingService
server.addService(shippingProto.ShippingService.service, {
    GetShippingRate: (call, callback) => {
        // Aceita tanto com quanto sem CEP
        const cep = call.request.cep || "00000000";
        callback(null, { value: Math.random() * 100 + 1 });
    }
});

server.bindAsync('0.0.0.0:3001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Shipping Service running at http://127.0.0.1:3001');
    server.start();
});
