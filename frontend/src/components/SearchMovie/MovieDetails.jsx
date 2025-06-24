import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieChat from "../MovieChat/MovieChat"; 

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const resp = await axios.get(`https://s82-sachin-m-s-iechat.onrender.com/api/movies/data/${id}`);
        setMovie(resp.data.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleClick = () => {
    if (movie?.movieID) {
      window.open(`https://www.imdb.com/title/${movie.movieID}`, "_blank");
    }
  };

  const addRecent = async () => {
    await axios.put(`http://localhost:5000/api/movies/recent-movies-list/${id}`, null, {
      withCredentials: true,
    });
  };

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#2f3136] text-white flex flex-col gap-6 items-center p-6">
      <button onClick={addRecent} className="bg-[#5865F2] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#4752C4] active:scale-95 transition">
        Add to Recent
      </button>

      <div onClick={handleClick} className="bg-[#36393f] rounded-2xl shadow-xl p-6 max-w-3xl w-full cursor-pointer hover:scale-105 flex flex-col md:flex-row gap-6 transition">
        <img
          src={movie.imgurl}
          alt={`${movie.title} Poster`}
          className="rounded-xl w-full md:w-1/3 object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-[#7289da]">{movie.title}</h1>
          <p className="text-gray-300 text-sm italic">{movie.plot}</p>
          <div className="text-sm text-gray-300 space-y-1">
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>IMDB Rating:</strong> {movie.IMDBrating}</p>
          </div>
          <p className="text-xs italic text-gray-500">Click to view on IMDb</p>
        </div>
      </div>

      {/* Pass username from user context */}
      <MovieChat movieID={movie.movieID} username={user?.username || "Guest"} />
    </div>
  );
};

export default MovieDetails;
