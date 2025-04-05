const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    title:{type:String,required:true},
    year:{type:String,required:true},
    gener:{type:String,required:true},
    director:{type:String,required:true},
    plot:{type:String,required:true},
    imgurl:{type:String,required:true},
    IMDBrating:{type:String,required:true},
    rottenTomatoesrating:{type:String,required:true},
    
})

module.exports = mongoose.model("Movie",MovieSchema)