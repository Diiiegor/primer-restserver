const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login',(req,res)=>{

    let body=req.body;

    Usuario.findOne({email:body.email},(err,usuarioDb)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            })
        }

        if (!usuarioDb){
            return res.status(400).json({
                ok:false,
                mensaje:'(Usuario) o contraseña incorrectos'
            })
        }

        if(!bcrypt.compareSync(body.password,usuarioDb.password)){
            return res.status(400).json({
                ok:false,
                mensaje:'Usuario o (contraseña) incorrectos'
            })
        }

        res.json({
            ok:true,
            usuario:usuarioDb,
            token:123
        })
    });
});


module.exports = app;