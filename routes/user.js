const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermission } = require("../middlewares");
const {
	getAllUsers,
	updateUser,
	deleteUser,
	getUserStats,
} = require("../controllers");

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllUsers);
router
	.route("/admin/:id")
	.patch([authenticateUser, authorizePermission("admin")], updateUser)
	.delete([authenticateUser, authorizePermission("admin")], deleteUser);
router.route("/stats").get(getUserStats);

module.exports = router;
