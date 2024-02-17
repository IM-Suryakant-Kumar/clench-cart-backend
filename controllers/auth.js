const { User } = require("../models");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const sendToken = require("../utils");

const register = async (req, res) => {
	const { username, email, password } = req.body;

	if (!(username && email && password)) {
		throw new BadRequestError("Please provide username, email, password");
	}

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError("Email is already exists");
	}

	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? "admin" : "user";

	const user = await User.create({ username, email, password, role });

	sendToken(user, 201, res, "Registered successfully");
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!(email && password)) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	sendToken(user, 200, res, "Logged in successfully");
};

const guestLogin = async (req, res) => {
	const email = "clenchcart@gmail.com";
	const password = "secret";

	if (!(email && password)) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	sendToken(user, 200, res, "Logged in successfully");
};

const logout = async (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ success: true, message: "Logged out successfully" });
};

const getProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).json({ success: true, user });
};

const updateProfile = async (req, res) => {
	await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
	});
	res
		.status(200)
		.json({ success: true, message: "Profile has been updated" });
};

const deleteProfile = async (req, res) => {
	await User.findByIdAndDelete(req.user._id);
	res
		.status(200)
		.json({ success: true, message: "Your accout has been deleted" });
};

module.exports = {
	register,
	login,
	guestLogin,
	logout,
	getProfile,
	updateProfile,
	deleteProfile,
};
