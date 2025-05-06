const {Signup,Login,Profile, Logout} = require("../controller/authController")
const { authenticate } = require("../middleware/authenticate")

const router = require("express").Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/profile",authenticate,Profile)
module.exports = router;