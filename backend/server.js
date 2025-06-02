const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./db/db")
const cookieParser = require("cookie-parser")
const path = require("path");

const chatRoute = require("./routes/chatBotRoutes")
const authRoute = require("./routes/authRoutes")
const movieRoute = require("./routes/movieRoutes")

require('dotenv').config({path:'config/.env'})
const cors = require("cors")


process.on('uncaughtException',(error)=>{
    console.log(`server shutthing down ${error.message}`)
    process.exit(1)
})

     
     
connectDB()
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,       
}))
app.use(cookieParser())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth',authRoute)
app.use("/api/movies",movieRoute)
app.use("/api/aibot",chatRoute)
 
app.listen(process.env.PORT,()=>{
    console.log("Success")
})
