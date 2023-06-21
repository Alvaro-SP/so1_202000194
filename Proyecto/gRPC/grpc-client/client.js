const express = require('express');
var cors = require('cors');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(cors());

var PROTO_PATH = './proto/voto.proto';

var parseArgs = require('minimist');
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

var argv = parseArgs(process.argv.slice(2), {
  string: 'target'
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  console.log("GRPC_SERVER: ", process.env.GRPC_SERVER)
  target = `${process.env.GRPC_SERVER}:50051`;   //direccion y puerto del servidor gRPC
}
// este seria el cliente gRPC creado usando el archivo voto.proto
var client = new voto_proto.Votos(target, grpc.credentials.createInsecure());
// las claves estan sin cifrado
app.get('/', function (req, res) {
  res.status(200).json({ mensaje: 'Bienvenido al Cliente gRPC' })
})
app.post('/NewMessages', function (req, res) {
  const data_voto = {
    sede: req.body.sede,
    municipio: req.body.municipio,
    departamento: req.body.departamento,
    papeleta: req.body.papeleta,
    partido: req.body.partido
  }
  console.log(data_voto)
  client.AddVoto(data_voto, function (err, response) {
    res.status(200).json({ mensaje: response.message })
  });
})

app.get('/listar-voto', function (req, res) {
  const rows = [];

  const call = client.ListarVotos();
  call.on('data', function (data) {
    rows.push(data);
  });
  call.on('end', function () {
    console.log('Data obtenida con exito');
    res.status(200).json({ data: rows });
  });
  call.on('error', function (e) {
    console.log('Error al obtener la data', e);
  });
})

app.listen(4000, () => {
  console.log('gRPC server on port ', 4000);
});