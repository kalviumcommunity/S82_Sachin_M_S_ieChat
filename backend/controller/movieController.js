const Movie = require("../models/MovieSchema")
const axios = require("axios")

module.exports.SearchMovies = async (req,res)=>{
    const {movieName,year,type} = req.query
    const list = await axios.get(`http://www.omdbapi.com/?s=${movieName.replace(" ","+")}&y=${year}&type=${type}&apikey=624e95e3&`)
    return res.status(200).json({data:list.data.Search})
}

module.exports.createMovies = async (req,res,next)=>{
    const {title,year,genre,director,plot,imgurl,IMDBrating,movieID} = req.body;
    const MovieExist = await Movie.findOne({movieID})
    if(MovieExist)next()
    
    const movie = new Movie.create({title,year,genre,director,plot,imgurl,IMDBrating,movieID})
    res.movieId = movieID
    next()
}

