const {SearchMovies} = require("../controller/movieController")
const router = require("express").Router()

router.get("/search-movies",SearchMovies)

module.exports = router