const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let categoriaSchema=new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requediro']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es requerido']
    }

});

module.exports = mongoose.model('Categoria', categoriaSchema);