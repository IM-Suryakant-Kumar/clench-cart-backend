const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		throw new UnauthenticatedError("Authentication Invalid");
	}

	const { userId } = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(userId);
	next();
};

const authorizePermission = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new UnauthorizedError("Unauthorized to access this route");
		}
		next();
	};
};

module.exports = {
	authenticateUser,
	authorizePermission
};
