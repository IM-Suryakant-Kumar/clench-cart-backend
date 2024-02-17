const router = require("express").Router();

const { authenticateUser } = require("../middlewares");
const {
	createWishlist,
	getAllWishlist,
	deleteWishlist,
} = require("../controllers/wishlist");

router
	.route("/")
	.get(authenticateUser, getAllWishlist)
	.post(authenticateUser, createWishlist);
router.route("/:id").delete(authenticateUser, deleteWishlist);

module.exports = router;
