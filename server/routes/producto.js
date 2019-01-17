const express = require('express');
const {verificaToken} = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');

//crea un producto y lo retorna, en caso contrario retorna el error
app.post('/productos', verificaToken, (req, res) => {
    let body = req.body;
    let usuario=req.usuario;
    let {nombre, precioUni, descripcion, categoria} = body;

    producto = new Producto({
        nombre,
        precioUni,
        descripcion,
        categoria,
        usuario:usuario._id
    })

    producto.save((error,productoDb)=>{
        if (error){
            return res.status(400).json({
                ok:false,
                mensaje:error
            })
        }

        res.json({
            ok:true,
            producto:productoDb
        })
    });
});

//lista todos los productos con sus categorias y usuarios que lo crearon
app.get('/productos',verificaToken,(req,res)=>{
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let condiciones={
        disponible:true
    };

    Producto.find(condiciones)
        .skip(desde)
        .limit(limite)
        .populate('usuario','nombre email')
        .populate('categoria','nombre')
        .exec((error,productos)=>{
            if (error){
                return res.status(400).json({
                    ok:false,
                    mensaje:error
                })
            }
            Producto.count(condiciones, (error, conteo) => {
                if (error){
                    return res.status(400).json({
                        ok:false,
                        mensaje:error
                    })
                }
                res.json({
                    ok:true,
                    productos,
                    cuantos:conteo
                })
            })

        })
});

module.exports = app;