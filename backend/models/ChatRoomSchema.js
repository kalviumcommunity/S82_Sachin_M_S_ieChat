const mongoose = require("mongoose")

const ChatRoomSchema = new mongoose.Schema({
    movie:{type:mongoose.Schema.Types.ObjectId, ref:"Movie",required:true},
    messages:{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        text:{type:String,required:true},
        timestamp:{type:Date,default:Date.now()},
    }
})


module.exports = mongoose.model("ChatRoom",ChatRoomSchema)
