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
                mensaje:err
            })
        }

        req.usuario=decoded.usuario;
        next();
    })
};

module.exports={
    verificaToken
};