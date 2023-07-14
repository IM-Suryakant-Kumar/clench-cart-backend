const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
	// console.log(err)

	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong try again later"
	};

	if (err.name === "ValidationError") {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.name === "CastError") {
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	// Wrong JWT error
	if (err.name === "JsonWebTokenError") {
		customError.msg = `Json Web Token is invalid, Try again `;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	// JWT EXPIRE error
	if (err.name === "TokenExpiredError") {
		customError.msg = `Json Web Token is Expired, Try again `;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
