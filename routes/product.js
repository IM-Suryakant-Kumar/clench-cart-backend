const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermission } = require("../middlewares");
const {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers");

router
	.route("/")
	.get(getAllProducts)
	.post([authenticateUser, authorizePermission("admin")], createProduct);
router
	.route("/:id")
	.patch([authenticateUser, authorizePermission("admin")], updateProduct)
	.delete([authenticateUser, authorizePermission("admin")], deleteProduct);

module.exports = router;
