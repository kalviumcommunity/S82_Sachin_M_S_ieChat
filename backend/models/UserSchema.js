const mongoose = require("mongoose")
const Movie = require("./MovieSchema")

const UserSchema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    RecentMovies:[{type:mongoose.Schema.Types.ObjectId,ref:"Movie",default:[]}],

})

module.exports = mongoose.model("User",UserSchema)

