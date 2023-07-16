const express = require("express");
const router = express.Router();
const {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct
} = require("../controllers/product");
const {
	authenticateUser,
	authorizePermission
} = require("../middleware/authentication");

router
	.route("/")
	.post([authenticateUser, authorizePermission("admin")], createProduct)
	.get(getAllProducts);
router
	.route("/:id")
	.get(getProduct)
	.patch([authenticateUser, authorizePermission("admin")], updateProduct)
	.delete([authenticateUser, authorizePermission("admin")], deleteProduct);

module.exports = router;
