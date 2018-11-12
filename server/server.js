require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//importo las rutas
app.use(require('./routes/usuario'));

//conexion a mongodb
mongoose.connect('mongodb://localhost:27017/cafe',{ useNewUrlParser: true },(error, res)=>{
    if (error) throw error;
    console.log('Base de datos online')
});




app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT)
});
