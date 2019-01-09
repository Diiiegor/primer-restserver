//=======================
//  Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
//  Entorno
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
//  Vencimiento del token
//=======================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN=60 * 60 * 24 * 30;


//=======================
//  seed
//=======================
process.env.SEED=process.env.SEED ||'este-es-el-seed-desarrollo';

//=======================
//  Base de datos
//=======================
let urlDb;
if (process.env.NODE_ENV == 'dev') {
    urlDb = 'mongodb://localhost:27017/cafe';
}
else {
    urlDb = 'mongodb://cafe-user:didra990@ds259079.mlab.com:59079/cafe';
}
process.env.URLDB = urlDb;

process.env.CLIENT_ID=process.env.CLIENT_ID||'941965223976-hrnrbag73pmj9luud7ca93l5pevt8ag6.apps.googleusercontent.com'
