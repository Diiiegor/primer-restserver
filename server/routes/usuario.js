const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario=require('../models/usuario');

app.get('/usuario', function (req, res) {
    res.json('get usuario Local')
});
app.post('/usuario', function (req, res) {
    let body=req.body;

    let usuario=new Usuario({
        nombre:body.nombre,
        email: body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
    });

    //guardar el usuario en base de datos
    usuario.save((error,usuarioDB)=>{
        if (error){
           return res.status(400).json({
                ok:false,
                mensaje:error
            })
        }

        //usuarioDB.password=null;

        res.json({
            ok:true,
            usuario:usuarioDB
        })
    });

});
app.put('/usuario/:id', function (req, res) {
    let id=req.params.id;
    res.json({id})
});
app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
});

module.exports=app;