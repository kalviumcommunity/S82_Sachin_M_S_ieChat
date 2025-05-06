const Movie = require("../models/MovieSchema")
const axios = require("axios")
module.exports.SearchMovies = async (req,res)=>{
    const {movieName} = req.body
    const list = await axios.get(`http://www.omdbapi.com/?s=${movieName.replace(" ","+")}&apikey=624e95e3&`)
    console.log(list.data)
    return res.status(200).json({data:list})
}