const Movie = require("../models/MovieSchema");
const User = require("../models/UserSchema");
const axios = require("axios");

module.exports.SearchMovies = async (req, res) => {
  try {
    const { movieName, year, type } = req.query;
    const list = await axios.get(`https://www.omdbapi.com/?s=${movieName.replace(" ", "+")}&y=${year}&type=${type}&apikey=624e95e3`);
    return res.status(200).json({ data: list.data.Search });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to search movies" });
  }
};

module.exports.CreateMovies = async (req, res) => {
  try {
    const { movieID } = req.params;

    const existing = await Movie.findOne({ movieID });
    if (existing) {
      return res.status(200).json({ message: "Already exists", movie: existing });
    }

    const { data: movieData } = await axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=624e95e3`);

    const movie = await Movie.create({
      title: movieData.Title,
      year: movieData.Year,
      genre: movieData.Genre,
      director: movieData.Director,
      plot: movieData.Plot,
      imgurl: movieData.Poster,
      IMDBrating: movieData.imdbRating,
      movieID,
    });

    return res.status(201).json({ message: `Added: ${movie.title}`, movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating movie" });
  }
};

module.exports.MovieData = async (req, res) => {
  try {
    const { movieID } = req.params;
    const movie = await Movie.findOne({ movieID });
    if (movie) return res.status(200).json({ message: "Fetched", data: movie });
    return res.status(404).json({ message: "Movie not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching movie" });
  }
};

module.exports.RecentMovieList = async (req, res) => {
  try {
    const { movieID } = req.params;

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "User not logged in" });

    const newMovie = await Movie.findOne({ movieID });
    if (!newMovie) return res.status(404).json({ message: "Movie not found" });

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          RecentMovies: {
            $each: [newMovie._id],
            $position: 0,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Added to recent list" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating recent list" });
  }
};
