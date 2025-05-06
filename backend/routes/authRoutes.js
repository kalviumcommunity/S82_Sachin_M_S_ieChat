const {Signup,Login,Profile} = require("../controller/authController")
const { authenticate } = require("../middleware/authenticate")

const router = require("express").Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.get("/profile",authenticate,Profile)
module.exports = router;