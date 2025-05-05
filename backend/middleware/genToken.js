const jwt = require("jsonwebtoken")
require("dotenv").config("./config/.env")

module.exports.generateToken = (id) =>{
    return jwt.sign({id},process.env.TOKEN_KEY,{expiresIn:'1d'})
}