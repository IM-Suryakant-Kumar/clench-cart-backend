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
	.post([authenticateUser, authorizePermission], createProduct)
	.get([authenticateUser, authorizePermission], getAllProducts);
router
	.route("/:id")
	.get([authenticateUser, authorizePermission], getProduct)
	.patch([authenticateUser, authorizePermission], updateProduct)
	.delete([authenticateUser, authorizePermission], deleteProduct);
    
module.exports = router;
