import React, { useState } from 'react'
import axios from "axios"
import MovieCard from './MovieCard'

function SearchMovies() {
    const [query,setQuery] = useState("")
    const [movieList,setMovieList] = useState([])

    const searchMovie = async (e) => {
    return (
    <div>
    <input onChange={(e)=>{setQuery(e.target.value)}} type="text" />
    <button onClick={searchMovie}>Search</button>  
    <div>
      {
      movieList.map((movie,i)=>(
      
      <MovieCard key={i} movie= {movie}/>
      
      ))
      }
    </div>
    </div>
  )
  }
}
export default SearchMovies
