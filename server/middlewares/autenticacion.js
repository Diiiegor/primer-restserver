const jwt=require('jsonwebtoken');


//=====================
//VERIFICAR TOKEN
//======================
let verificaToken=(req,res,next)=>{
    let token=req.get('Authorization')

    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                mensaje: 'Token no valido'
            })
        }

        req.usuario=decoded.usuario;
        next();
    })
};

//=====================
//VERIFICAR ADMIN_ROLE
//======================
let verificaAdmin_role=(req,res,next)=>{
    let usuario=req.usuario;
    if (usuario.role=='USER_ROLE'){
        return res.status(401).json({
            ok:false,
            mensaje: 'EL usuario no es administrador'
        })
    }

    next();
    
}



//=====================
//VERIFICAR TOKEN PARA IMAGEN
//======================
let verificaTokeImg=(req, res, next)=>{

    let token=req.query.token;

    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                mensaje: 'Token no valido'
            })
        }

        req.usuario=decoded.usuario;
        next();
    })
}

module.exports={
    verificaToken,
    verificaAdmin_role,
    verificaTokeImg
};
