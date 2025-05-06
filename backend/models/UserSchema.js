const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""},
    RecentMovies:[{type:mongoose.Schema.Types.ObjectId,ref:"Movie",default:[]}],

})

UserSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next()
    try{
        this.password = await bcrypt.hash(this.password,10)
        next()
    }catch(err){
        next(err)
    }
})

module.exports = mongoose.model("User",UserSchema)

