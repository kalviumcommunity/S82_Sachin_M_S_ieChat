import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieInfo = async () => {
    try {
      const response = await axios.post(`https://s82-sachin-m-s-iechat.onrender.com/api/movies/create-movies/${movie.imdbID}`);
      const film = response.data.movie;
      navigate(`/movie/${film.movieID}`);
    } catch (error) {
      console.error("Error creating/fetching movie:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={handleMovieInfo}
      className="bg-[#2f3136] text-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row w-full max-w-3xl mx-auto transition transform hover:scale-[1.01] hover:shadow-2xl duration-200 cursor-pointer"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full sm:w-44 h-auto object-cover"
      />
      <div className="flex flex-col justify-between p-5 sm:p-6 space-y-4 flex-1">
        <div>
          <h3 className="text-2xl font-bold mb-1">{movie.Title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>📅 {movie.Year}</span>
            <span>🎬 {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1)}</span>
          </div>
        </div>
        <p className="text-blue-400 text-sm">Click for more info</p>
      </div>
    </div>
  );
};

export default MovieCard;
