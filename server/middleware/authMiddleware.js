const jwt= require('jsonwebtoken')
const HttpError= require('../models/errorModle')

const authMiddleware= async (req, res, next)=>{
    const Authorization= req.headers.Authorization || req.headers.authorization
    if(Authorization && Authorization.toLowerCase().startsWith("bearer")){
        const token=Authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRETKEY,  (err, info)=>{
            if(err){
                return next(new HttpError(err))
            }
            req.user=info
            next()
        })
    }else{
        return next(new HttpError("Unauthorized. No token", 402)) 
    }
}
module.exports= authMiddleware