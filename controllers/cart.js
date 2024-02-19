const { Cart, Product } = require("../models");

const getAllCarts = async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json({ success: true, carts });
};

const getUserCarts = async (req, res) => {
  const carts = await Cart.find({ userId: req.user._id });
  let products = [];
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let cart of carts) {
    let { _id, productId, quantity, color, size } = cart;

    let { title, desc, img, price } = await Product.findById(productId);

    products.push({
      _id,
      productId,
      title,
      desc,
      img,
      price,
      quantity,
      color,
      size,
    });

    totalQuantity += 1;
    totalPrice += price;
  }

  res.status(200).json({ success: true, products, totalQuantity, totalPrice });
};

const createCart = async (req, res) => {
	let { productId, color, size, quantity } = req.body;

	const product = await Product.findById(productId);

	!color &&
		!size &&
		!quantity &&
		((color = product.color[0]), (size = product.size[0]), (quantity = 1));

	await Cart.create({ userId: req.user._id, productId, color, size, quantity });

	res.status(201).json({ success: true, message: "Item added to cart" });
};


const updateCart = async (req, res) => {
	const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ success: true, cart });
};

const deleteCart = async (req, res) => {
	await Cart.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Item removed from cart" });
};


module.exports = {
	getAllCarts,
	getUserCarts,
	createCart,
	updateCart,
	deleteCart,
};
