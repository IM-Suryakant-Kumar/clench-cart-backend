const router = require("express").Router()

const { 
    createWishlist, 
    getAllWishlist,
    deleteWishlist 
} = require("../controllers/wishlist")
const { authenticateUser } = require("../middleware/authentication")

router.route("/")
    .post(authenticateUser, createWishlist)
    .get(authenticateUser, getAllWishlist)

router.route("/:id")
    .delete(authenticateUser, deleteWishlist)

module.exports = router