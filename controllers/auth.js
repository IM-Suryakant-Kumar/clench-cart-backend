const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const sendToken = require("../utils/jwtToken");

// REGISTER
const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!(name && email && password)) {
		throw new BadRequestError("Please provide name, email, password");
	}

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError("Email is already exists");
	}

	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? "admin" : "user";

	const user = await User.create({ name, email, password, role });

	sendToken(user, StatusCodes.CREATED, res);
};

// LOGIN
const login = async (req, res) => {
	const { email, password } = req.body;

	if (!(email && password)) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid credential");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credential");
	}

	sendToken(user, StatusCodes.OK, res);
};

// LOGOUT
const logout = async (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true
	});

    res.status(StatusCodes.OK).json({msg: "Logged out"})
};

module.exports = {
	register,
	login,
    logout
};
