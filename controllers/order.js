const Order = require("../models/Order");
const Cart = require("../models/Cart")
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

// CREATE
const createOrder = async (req, res) => {
    const carts = await Cart.find({ userId: req.user._id })
    // console.log(carts)

    let products = []

    for(let cart of carts) {
        let { userId, productId, color, size, quantity } = cart

        let newProduct = {
            userId, productId, color, size, quantity
        }

        products.push(newProduct)
    }

	await Order.create(products);
    await Cart.deleteMany({ userId: req.user._id })

	res.status(StatusCodes.CREATED).json({ msg: "Order successful" });
};
// GET USER ORDERS
const getUserOrders = async (req, res) => {
	const orders = await Order.find({ userId: req.user._id });
    let products = []

    for(let order of orders) {
        let  { _id, productId, quantity, color, size } = order

        let { title, desc, img, price } = await Product.findById(productId)
        let newProduct = {
            _id, title, desc, img, price: price * quantity, color, size, quantity
        }

        products.push(newProduct)
    }

	res.status(StatusCodes.OK).json(products);
};
// GET ALL
const getAllOrders = async (req, res) => {
	const orders = await Order.find();
	res.status(StatusCodes.OK).json(orders);
};
// UPDATE
const updateOrder = async (req, res) => {
	const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	res.status(StatusCodes.OK).json(order);
};
// DELETE
const deleteOrder = async (req, res) => {
	await Order.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({ msg: "Order has been deleted" });
};
// GET MONTHLY INCOME
const getMonthlyIncone = async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
	const income = await Order.aggregate([
		{ $match: { $createdAt: { $gte: previousMonth } } },
		{
			$project: {
				month: { $month: "$createdAt" },
				sales: "$amount"
			}
		},
		{
			$group: {
				_id: "$month",
				total: { $sum: "$sales" }
			}
		}
	]);
	res.status(StatusCodes.OK).json(income);
};

module.exports = {
	createOrder,
	getUserOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
    getMonthlyIncone
};
