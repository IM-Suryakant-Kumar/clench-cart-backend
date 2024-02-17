const { User } = require("../models");

// USER
const userProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).json({ success: true, user });
};

const updateProfile = async (req, res) => {
	await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
	});
	res
		.status(200)
		.json({ success: true, message: "Profile updated successfully" });
};

const deleteAccount = async (req, res) => {
	await User.findByIdAndDelete(req.user._id);
	res
		.status(200)
		.json({ success: true, message: "Your accout has been deleted" });
};

// ADMIN
const getAllUsers = async (req, res) => {
	const query = req.query.new;
	const users = query
		? await User.find().sort({ _id: -1 }).limit(5)
		: await User.find();
	res.status(200).json({ success: true, users });
};

const getUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ success: true, user });
};

const updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ success: true, user });
};

const deleteUser = async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "user has been deleted" });
};

const getUserStats = async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
	const data = await User.aggregate([
		{ $match: { createdAt: { $gte: lastYear } } },
		{
			$project: {
				month: { $month: "$createdAt" },
			},
		},
		{
			$group: {
				_id: "$month",
				total: { $sum: 1 },
			},
		},
	]);
	res.status(200).json({ success: true, data });
};

module.exports = {
	updateProfile,
	userProfile,
	deleteAccount,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
	getUserStats,
};
