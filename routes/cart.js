const express = require("express");
const router = express.Roouter();
const {
	createCart,
	getUserCarts,
	getAllCarts,
	updateCart,
	deleteCart
} = require("../controllers/cart");
const {
	authenticateUser,
	authorizePermission
} = require("../middleware/authentication");

router
	.route("/")
	.post(authenticateUser, createCart)
	.get(authenticateUser, getUserCarts);

router
	.route("/:id")
	.patch(authenticateUser, updateCart)
	.delete(authenticateUser, deleteCart);

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllCarts)

module.exports = router;
