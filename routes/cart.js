const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermission } = require("../middlewares");
const {
	getAllCarts,
	getUserCarts,
	createCart,
	updateCart,
	deleteCart,
} = require("../controllers");

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllCarts);
router
	.route("/")
	.get(authenticateUser, getUserCarts)
	.post(authenticateUser, createCart);
router
	.route("/:id")
	.patch(authenticateUser, updateCart)
	.delete(authenticateUser, deleteCart);

module.exports = router;
