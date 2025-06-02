const limiter = require("express-rate-limit")

const ChatLimiter = limiter({
    windowMs:60*1000,
    max:5,
    message:{
        status:429,
        error:"Too many request!! Wait for a minute and try again", 
    },
    standardHeaders:true,
    legacyHeaders:false,
})

module.exports = ChatLimiter;
