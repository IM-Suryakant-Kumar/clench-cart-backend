const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermission } = require("../middlewares");
const {
	getAllOrders,
	getUserOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getMonthlyIncone,
} = require("../controllers/order");

router
	.route("/admin")
	.get([authenticateUser, authorizePermission("admin")], getAllOrders);
router
	.route("/")
	.get(authenticateUser, getUserOrders)
	.post(authenticateUser, createOrder);
router
	.route("/admin/:id")
	.patch([authenticateUser, authorizePermission("admin")], updateOrder)
	.delete([authenticateUser, authorizePermission("admin")], deleteOrder);
router
	.route("/income")
	.get([authenticateUser, authorizePermission("admin")], getMonthlyIncone);

module.exports = router;
