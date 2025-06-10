const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./db/db")
const cookieParser = require("cookie-parser")
const path = require("path");
const {Server} = require("socket.io") 
const http = require("http")

const chatRoute = require("./routes/chatBotRoutes")
const authRoute = require("./routes/authRoutes")
const movieRoute = require("./routes/movieRoutes")

const MovieChatSchema = require("./models/MovieChatSchema")

require('dotenv').config({path:'config/.env'})
const cors = require("cors")

process.on('uncaughtException',(error)=>{
    console.log(`server shutthing down ${error.message}`)
    process.exit(1)
})



   
     
connectDB()
const app = express()

const server = http.createServer(app)
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,       
}))
app.use(cookieParser())


const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`Socket Conneted ${socket.id}`)

    socket.on('join_movie_room',(movieID)=>{
        socket.join(movieID)
        console.log(`User Connected`)
    
    })

    socket.on("send_message",async (data)=>{
        const {movieID,sender,message} = data;

        const newMessage =await MovieChatSchema.create({movieID,sender,message})
        
        io.to(movieID).emit('receive_message',newMessage)
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected")
    })

})  




app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth',authRoute)
app.use("/api/movies",movieRoute)
app.use("/api/aibot",chatRoute)
 
server.listen(process.env.PORT,()=>{
    console.log("Success")
})
