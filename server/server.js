require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//importo las rutas
app.use(require('./routes/index'));

//habilito la carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));

//conexion a mongodb
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true },(error, res)=>{
    if (error) throw error;
    console.log('Base de datos online')
});




app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT)
});
