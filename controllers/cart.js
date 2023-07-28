const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

// CREATE CART
const createCart = async (req, res) => {
    let { productId, color, size, quantity } = req.body

    const product = await Product.findById(productId)

    !color && !size && !quantity 
        && ( color = product.color[0],  size  = product.size[0],  quantity  = 1)

    await Cart.create({ userId: req.user._id, productId, color, size, quantity });

	res.status(StatusCodes.CREATED).json({ msg: "Item added to cart" });
};
// GET USER CARTS
const getUserCarts = async (req, res) => {
	const carts = await Cart.find({ userId: req.user._id });
    let products = []
    let totalQuantity = 0
    let totalPrice = 0
    // console.log(carts)

    for (let cart of carts) {
        let { _id, productId, quantity, color, size } = cart
        
        let { title, desc, img, price } = await Product.findById(productId)
        
        products.push({ _id, productId, title, desc, img, price, quantity, color, size })
        
        totalQuantity += 1
        totalPrice += price
    }
    // console.log({ products, totalQuantity, totalPrice })
    
	res.status(StatusCodes.OK).json({ products, totalQuantity, totalPrice });
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
	res.status(StatusCodes.OK).json({ msg: "Item removed" });
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
