const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

// CREATE CART
const createCart = async (req, res) => {
	const cart = await Cart.create({ userId: req.user._id, product: req.body });
	res.status(StatusCodes.CREATED).json(cart);
};
// GET USER CARTS
const getUserCarts = async (req, res) => {
	const carts = await Cart.find({ userId: req.user._id });
    let products = [], quantity = 0, totalPrice = 0

    carts.forEach(async (cart) => {
        let product = await Product.findById(cart.productId)
        products.push(product)
        quantity += cart.quantity
        totalPrice += cart.price
    })

	res.status(StatusCodes.OK).json({ products, quantity, totalPrice });
};
// UPDATE CART
const updateCart = async (req, res) => {
	const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	res.status(StatusCodes.OK).json(cart);
};
// DELETE CART
const deleteCart = async (req, res) => {
	await Cart.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({ msg: "Cart has been deleted" });
};
// GET ALL CARTS
const getAllCarts = async (req, res) => {
	const carts = await Cart.find();
	res.status(StatusCodes.OK).json(carts);
};

module.exports = {
	createCart,
	getUserCarts,
	updateCart,
	deleteCart,
	getAllCarts
};
