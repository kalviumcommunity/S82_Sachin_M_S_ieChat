const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    movie:{type:mongoose.Schema.Types.ObjectId, ref:"Movie",required:true},
    review:{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        text:{type:String,required:true},
        timestamp:{type:Date,default:Date.now()},
    },
    Rating:{type:Number,required:true}
})


module.exports = mongoose.model("Review",ReviewSchema)
