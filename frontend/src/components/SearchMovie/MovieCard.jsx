import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-[#2f3136] text-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row w-full max-w-3xl mx-auto transition transform hover:scale-[1.01] hover:shadow-2xl duration-200">
      
      {/* Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full sm:w-44 h-auto object-cover"
      />

      {/* Movie Info */}
      <div className="flex flex-col justify-between p-5 sm:p-6 space-y-4 flex-1">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{movie.Title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>📅 {movie.Year}</span>
            <span>🎬 {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white"
          >
            🔗 View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
