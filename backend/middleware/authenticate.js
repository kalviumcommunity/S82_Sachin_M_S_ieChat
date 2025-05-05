const jwt = require("jsonwebtoken")

module.exports.authenticate = async (req,res,next)=>{
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({message:"no token provided"})
    }
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)
        req.userId = decoded.id
        next()
    }catch(err){
        return res.status(500).json({message:"Invalid Token"})
    }
}