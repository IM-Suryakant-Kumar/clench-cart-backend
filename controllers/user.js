const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

// USER
// GET USER PROFILE
const userProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(StatusCodes.OK).json(user);
};
// UPDATE PROFILE
const updateProfile = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true
	});
	res.status(StatusCodes.OK).json(user);
};
// DELETE ACCOUNT
const deleteAccount = async (req, res) => {
	await User.findByIdAndDelete(req.user._id);
	res.status(StatusCodes.OK).json({ msg: "Your accout has been deleted" });
};

// ADMIN
// GET ALL USER
const getAllUsers = async (req, res) => {
	const query = req.query.new;
	const users = query
		? await User.find().sort({ _id: -1 }).limit(5)
		: await User.find();
	res.status(StatusCodes.OK).json(users);
};
// GET USER
const getUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(StatusCodes.OK).json(user);
};
// UPDATE USER
const updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	res.status(StatusCodes.OK).json(user);
};
// DELETE
const deleteUser = async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({ msg: "user has been deleted" });
};
// GET USER STATS
const getUserStats = async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
	const data = await User.aggregate([
		{ $match: { createdAt: { $gte: lastYear } } },
		{
			$project: {
				month: { $month: "$createdAt" }
			}
		},
		{
			$group: {
				_id: "$month",
				total: { $sum: 1 }
			}
		}
	]);
	res.status(StatusCodes.OK).json(data);
};

module.exports = {
	updateProfile,
	userProfile,
	deleteAccount,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
	getUserStats
};
