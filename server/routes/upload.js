const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function (req, res) {

    let {tipo, id} = req.params;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No hay archivos seleccionados'
        })
    }

    //valido tipos
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo invalido. Los tipos permitidos son:' + tiposValidos.join(', ')
        })
    }


    let archivo = req.files.archivo;
    let arrArchivo = archivo.name.split('.');
    let extencion = arrArchivo[arrArchivo.length - 1];

    //extenciones validas
    let extencionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesPermitidas.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extencion invalida. Las extenciones permitidas son:' + extencionesPermitidas.join(', ')
        })
    }

    //Cambio nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencion}`;


    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (error) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: error
            })
        }

        //aqui la imagen se cargo
        imagenUsuario(id, res, nombreArchivo)
    })

});


function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (error, usuarioDB) => {
        if (error) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                mensaje: error
            })
        }
        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no existe'
            })
        }


        borraArchivo(usuarioDB.img, 'usuarios');
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((error, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })

    })
}

function imagenProducto() {
}


function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen)
    }
}

module.exports = app;
