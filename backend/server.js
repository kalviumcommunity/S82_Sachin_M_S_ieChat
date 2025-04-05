const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./db/db")


process.on('uncaughtException',(error)=>{
    console.log(`server shutthing down ${error.message}`)
    process.exit(1)
})

 if(process.env.NODE_ENV !== 'PRODUCTION'){
     require('dotenv').config({path:'config/.env'})}
     
connectDB()
const app = express()

app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log("Success")
})
