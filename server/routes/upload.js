const express=require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok:false,
            mensaje:'No hay archivos seleccionados'
        })
    }
    let archivo = req.files.archivo;

    archivo.mv('uploads/archivo.jpg',(error)=>{
        if (error){
            return res.status(500).json({
                ok:false,
                mensaje:error
            })
        }
        res.json({
            ok:true,
            mensaje:'Archivo cargado con exito'
        })
    })

});

module.exports=app;