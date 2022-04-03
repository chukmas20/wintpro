const express = require("express");
const { registerUser, loginUser, logout, getUserDetails, updateProfile, getSingleUser } = require("../controllers/userController");
const { isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router()



router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);















module.exports = router;
