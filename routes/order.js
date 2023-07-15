const express = require("express");
const router = express.Router();
const {
	createOrder,
	getUserOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
	getMonthlyIncone
} = require("../controllers/order");
const {
	authenticateUser,
	authorizePermission
} = require("../middleware/authentication");

router
	.route("/")
	.post(authenticateUser, createOrder)
	.get(authenticateUser, getUserOrders);

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllOrders);

router
	.route("/admin/:id")
	.patch([authenticateUser, authorizePermission("admin")], updateOrder)
	.delete([authenticateUser, authorizePermission("admin")], deleteOrder);

router
	.route("/income")
	.get([authenticateUser, authorizePermission("admin")], getMonthlyIncone);

module.exports = router;
