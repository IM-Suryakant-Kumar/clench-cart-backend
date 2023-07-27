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
    .delete(authenticateUser, deleteWishlist)

module.exports = router