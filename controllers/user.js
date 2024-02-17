const { User } = require("../models");

const getAllUsers = async (req, res) => {
	const query = req.query.new;
	const users = query
		? await User.find().sort({ _id: -1 }).limit(5)
		: await User.find();
	res.status(200).json({ success: true, users });
};

const updateUser = async (req, res) => {
	await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ success: true, message: "User has been updated" });
};

const deleteUser = async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "User has been deleted" });
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
	getAllUsers,
	updateUser,
	deleteUser,
	getUserStats,
};
