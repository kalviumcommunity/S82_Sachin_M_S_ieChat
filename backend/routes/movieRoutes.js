const {SearchMovies,CreateMovies,MovieData,RecentMovieList,} = require("../controller/movieController");
const { authenticate } = require("../middleware/authenticate")

const router = require("express").Router();

router.get("/search-movies", SearchMovies);

router.post("/create-movies/:movieID", CreateMovies);

router.get("/data/:movieID", MovieData);

router.put("/recent-movies-list/:movieID",authenticate, RecentMovieList);

module.exports = router;
