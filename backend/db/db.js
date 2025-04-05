const mongoose = require("mongoose")


module.exports = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected Database")
    }catch(err){
        console.log(err)
    }
    
}

