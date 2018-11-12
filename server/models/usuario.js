const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos={
    values:['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requediro']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'EL email es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'EL rol es requerido'],
        default: 'USER_ROLE',
        enum:rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON=function(){
    let user=this;
    let userObject=user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} Debe ser unico.'});
module.exports = mongoose.model('Usuario', usuarioSchema);