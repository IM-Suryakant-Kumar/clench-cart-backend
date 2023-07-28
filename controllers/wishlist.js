const { StatusCodes } = require("http-status-codes")
const Wishlist = require("../models/Wishlist")
const Product = require("../models/Product")

const createWishlist = async (req, res) => {
    await Wishlist.create({ userId: req.user.id, productId: req.body.productId })

    res.status(StatusCodes.CREATED).json({ msg: "Added to wishlist" })
}

const getAllWishlist = async (req, res) => {
    const wishlists = await Wishlist.find({userId: req.user._id})
    const products = []

    for(let wishlist of wishlists) {
        let { _id, productId } = wishlist
        let { title, desc, img, price } = await Product.findById(productId)

        products.push({ _id, productId, title, desc, img, price })
    }

    res.status(StatusCodes.OK).json(products)
}

const deleteWishlist = async (req, res) => {
    await Wishlist.findByIdAndDelete(req.body._id)

    res.status(StatusCodes.OK).json({ msg: "Remove from wishlist"})
}

module.exports = {
    createWishlist,
    getAllWishlist,
    deleteWishlist
}