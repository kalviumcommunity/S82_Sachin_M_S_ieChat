import React, { useState } from 'react'
import axios from "axios"
import MovieCard from './MovieCard'

function SearchMovies() {
    const [movieName,setMovieName] = useState("")
    const [year,setYear] = useState("")
    const [type,setType] = useState("")
    const [movieList,setMovieList] = useState([])
    
    const handleSearch = async ()=>{
      if(type == "both")setType("")
      const resp = await axios.get("http://localhost:5000/api/movies/search-movies",{
   params: {movieName:movieName,year:year,type:type}
  })
  console.log(resp.data.data)  
  setMovieList(resp.data.data)
    } 

    return (
<div className="bg-[#2f3136] text-white p-4 rounded-xl w-full max-w-4xl mx-auto shadow-lg space-y-4">
  <h2 className="text-xl font-semibold text-gray-100">🎬 Search Movies</h2>
  
  <div className="flex flex-col md:flex-row md:items-end gap-4">
    {/* Movie Name Input */}
    <div className="flex-1">
      <label className="block text-sm text-gray-400 mb-1">Movie Title</label>
      <input
        type="text"
        onChange={e => setMovieName(e.target.value)}
        placeholder="e.g. Interstellar"
        className="w-full px-3 py-2 bg-[#40444b] border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Year Input */}
    <div className="w-32">
      <label className="block text-sm text-gray-400 mb-1">Year</label>
      <input
        type="number"
        onChange={e => setYear(e.target.value)}
        placeholder="e.g. 2014"
        className="w-full px-3 py-2 bg-[#40444b] border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Type Selector */}
    <div className="w-36">
      <label className="block text-sm text-gray-400 mb-1">Type</label>
      <select
        onChange={e => setType(e.target.value)}
        className="w-full px-3 py-2 bg-[#40444b] border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="both">Both</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
    </div>

    {/* Submit Button */}
    <div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition duration-150 mt-1 md:mt-0"
      >
        🔍 Search
      </button>
    </div>
  </div>
  {movieList.map((movie,ind)=>(

    <MovieCard key={ind} movie={movie} />

  ))}
</div>


  )
  
}
export default SearchMovies
