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
	const { username, password } = req.body;

	if (!(username && password)) {
		throw new BadRequestError("Please provide username and password");
	}

	const user = await User.findOne({ username }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	sendToken(user, 200, res, "Login successfully");
};

const logout = async (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
