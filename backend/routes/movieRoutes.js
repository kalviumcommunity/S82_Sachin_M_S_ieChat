const {SearchMovies,CreateMovies,MovieData,RecentMovieList,ChatHistory} = require("../controller/movieController");
const { authenticate } = require("../middleware/authenticate")

const router = require("express").Router();

router.get("/search-movies", SearchMovies);

router.post("/create-movies/:movieID", CreateMovies);

router.get("/data/:movieID", MovieData);

router.put("/recent-movies-list/:movieID",authenticate, RecentMovieList);

router.get("/movie-chats/:movieID",ChatHistory)

module.exports = router;
