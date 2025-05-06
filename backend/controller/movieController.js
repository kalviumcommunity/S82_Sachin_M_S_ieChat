const Movie = require("../models/MovieSchema")
const axios = require("axios")

module.exports.SearchMovies = async (req,res)=>{
    const {movieName,year,type} = req.query
    const list = await axios.get(`http://www.omdbapi.com/?s=${movieName.replace(" ","+")}&y=${year}&type=${type}&apikey=624e95e3&`)
    return res.status(200).json({data:list.data.Search})
}