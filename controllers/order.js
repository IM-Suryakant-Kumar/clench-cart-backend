const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");

// CREATE
const createOrder = async (req, res) => {
	const order = await Order.create(req.body);
	res.status(StatusCodes.CREATED).json(order);
};
// GET USER ORDERS
const getUserOrders = async (req, res) => {
	const orders = await Order.find({ userId: req.user._id });
	res.status(StatusCodes.OK).json(orders);
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
