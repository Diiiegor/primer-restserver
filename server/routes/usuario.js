const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

app.get('/usuario', function (req, res) {

    let desde=req.query.desde || 0;
    desde=Number(desde);

    let limite=req.query.limite || 5;
    limite= Number(limite)

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((error, usuarios) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: error
                })
            }

            res.json({
                ok: true,
                usuarios
            })

        })
});
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //guardar el usuario en base de datos
    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        }

        //usuarioDB.password=null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDb
        })

    })

});
app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
});

module.exports = app;