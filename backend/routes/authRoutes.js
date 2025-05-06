const {Signup,Login,Profile, Logout, UpdateProfilePic} = require("../controller/authController")
const { authenticate } = require("../middleware/authenticate")
const upload = require("../middleware/uploads")


const router = require("express").Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/profile",authenticate,Profile)
router.put("/update-profile-pic",authenticate,upload.single("profilePic"),UpdateProfilePic)

module.exports = router;