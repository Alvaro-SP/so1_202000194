const Conn = require('./conn');

var PROTO_PATH = './proto/voto.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var voto_proto = grpc.loadPackageDefinition(packageDefinition).voto;


function AddVoto(call, callback) {
    console.log(call.request)
    const query = 'INSERT INTO Voto (sede,municipio,departamento,papeleta,partido) VALUES (' +
        call.request.sede + ',' +
        '\'' + call.request.municipio + '\',' +
        '\'' + call.request.departamento + '\',' +
        '\'' + call.request.papeleta + '\',' +
        '\'' + call.request.partido + '\');';
    Conn.query(query, function (err, rows, fields) {
        if (err) throw err;
        callback(null, { message: 'Voto insertado en la base de datos' });
    });
}

function ListarVotos(call) {
    const query = 'SELECT sede,municipio,departamento,papeleta,partido FROM Voto;';

    Conn.query(query, function (err, rows, fields) {
        if (err) throw err;
        //console.log(rows.length)
        for (const data of rows) {
            //console.log(data);
            call.write(data);
        }
        call.end();
    });
}

function main() {
    var server = new grpc.Server();
    server.addService(voto_proto.Votos.service, {
        AddVoto: AddVoto,
        ListarVotos: ListarVotos
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start(); //iniciamos el servidor
        console.log('gRPC server on port 50051')
    });
}

main();