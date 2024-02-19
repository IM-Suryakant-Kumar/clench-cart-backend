const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares");
const {
	register,
	login,
	guestLogin,
	logout,
	getProfile,
	updateProfile,
	deleteProfile,
} = require("../controllers");

router.route("/register").post(register);
router.route("/login").post(login).get(guestLogin);
router.route("/logout").get(authenticateUser, logout);
router
	.route("/me")
	.get(authenticateUser, getProfile)
	.patch(authenticateUser, updateProfile)
	.delete(authenticateUser, deleteProfile);

module.exports = router;
