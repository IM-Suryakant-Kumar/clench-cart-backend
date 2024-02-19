const { Wishlist, Product } = require("../models");

const getAllWishlist = async (req, res) => {
	const wishlists = await Wishlist.find({ userId: req.user._id });
	const products = [];

	for (let wishlist of wishlists) {
		let { _id, productId } = wishlist;
		let { title, desc, img, price } = await Product.findById(productId);

		products.push({ _id, productId, title, desc, img, price });
	}

	res.status(200).json({ success: true, products });
};

const createWishlist = async (req, res) => {
	await Wishlist.create({ userId: req.user.id, productId: req.body.productId });
	res.status(201).json({ success: true, message: "Added to wishlist" });
};

const deleteWishlist = async (req, res) => {
	await Wishlist.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Removed from wishlist" });
};

module.exports = {
	getAllWishlist,
	createWishlist,
	deleteWishlist,
};
