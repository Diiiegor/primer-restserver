//imports
const express=require('express');
let {verificaToken,verificaAdmin_role}=require('../middlewares/autenticacion');
let Categoria=require('../models/categoria');
const _ = require('underscore');


//levanto servidor
let app=express();


//mostrar todas las categorias
app.get('/categoria',verificaToken,(req,res)=>{
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find()
        .skip(desde)
        .limit(limite)
        .exec((error,categorias)=>{

            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: error
                })
            }

            Categoria.count( (error, conteo) => {

                if (error) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: error
                    })
                }

                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                })
            })

        })
});

//mostrar una categoria por id
app.get('/categoria/:id',verificaToken,(req,res)=>{
    let id = req.params.id;
    Categoria.findById(id,(error,categoria)=>{
        if (error){
            return res.status(400).json({
                ok:false,
                mensaje:error
            })
        }

        res.json({
            ok:true,
            categoria
        })
    })
});

//crear una nueva categoria y la regresa
app.post('/categoria',verificaToken,(req,res)=>{
    let body=req.body;

    let categoria=new Categoria({
        nombre:body.nombre,
        usuario:req.usuario._id
    })

    categoria.save((error,categoriaDb)=>{
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDb
        })
    })
});

//actualiza una categoria y la regresa ya actualizada
app.put('/categoria/:id',verificaToken,(req,res)=>{
    let id=req.params.id;
    let body=_.pick(req.body,['nombre'])

    Categoria.findByIdAndUpdate(id,body,{new: true},(error,categoria)=>{
        if (error){
            return res.status(400).json({
                ok:false,
                mensaje:error
            })
        }
        res.json({
            ok:true,
            categoria
        })
    })
});

//elimina una categoria
app.delete('/categoria/:id',[verificaToken,verificaAdmin_role],(req,res)=>{
    let id=req.params.id;
    Categoria.findByIdAndRemove(id,(error,categoria)=>{
        if (error){
            return res.status(400).json({
                ok:false,
                mensaje:error
            })
        }

        res.json({
            ok:true,
            categoria
        })
    });
})


//exporto rutas
module.exports=app;