const express = require("express");
const router = express.Router();
const {
	userProfile,
	updateProfile,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	getUserStats,
    deleteAccount
} = require("../controllers/user");
const {
	authenticateUser,
	authorizePermission
} = require("../middleware/authentication");

router
	.route("/me")
	.get(authenticateUser, userProfile)
	.patch(authenticateUser, updateProfile)
	.delete(authenticateUser, deleteAccount);

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllUsers);
router
	.route("/admin/:id")
	.get([authenticateUser, authorizePermission("admin")], getUser)
	.patch([authenticateUser, authorizePermission("admin")], updateUser)
	.delete([authenticateUser, authorizePermission("admin")], deleteUser);
router.route("/stats").get(getUserStats);

module.exports = router;
