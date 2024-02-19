const { Order, Cart, Product } = require("../models");

const getAllOrders = async (req, res) => {
	const orders = await Order.find();
	res.status(200).json({ success: true, orders });
};

const getUserOrders = async (req, res) => {
	const orders = await Order.find({ userId: req.user._id });
	let products = [];

	for (let order of orders) {
		let { _id, productId, quantity, color, size } = order;

		let { title, desc, img, price } = await Product.findById(productId);
		let newProduct = {
			_id,
			title,
			desc,
			img,
			price: price * quantity,
			color,
			size,
			quantity,
		};

		products.push(newProduct);
	}

	res.status(200).json({ success: true, products });
};

const createOrder = async (req, res) => {
	const carts = await Cart.find({ userId: req.user._id });

	let products = [];

	for (let cart of carts) {
		let { userId, productId, color, size, quantity } = cart;

		let newProduct = {
			userId,
			productId,
			color,
			size,
			quantity,
		};

		products.push(newProduct);
	}

	await Order.create(products);
	await Cart.deleteMany({ userId: req.user._id });

	res.status(201).json({ success: true, message: "Order successful" });
};

const updateOrder = async (req, res) => {
	const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res
		.status(200)
		.json({ success: true, order, message: "Order updated successfully" });
};

const deleteOrder = async (req, res) => {
	await Order.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Order has been deleted" });
};

const getMonthlyIncone = async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
	const income = await Order.aggregate([
		{ $match: { $createdAt: { $gte: previousMonth } } },
		{
			$project: {
				month: { $month: "$createdAt" },
				sales: "$amount",
			},
		},
		{
			$group: {
				_id: "$month",
				total: { $sum: "$sales" },
			},
		},
	]);
	res.status(200).json({ success: true, income });
};

module.exports = {
	getAllOrders,
	getUserOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getMonthlyIncone,
};
