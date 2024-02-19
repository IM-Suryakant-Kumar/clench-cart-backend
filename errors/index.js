class CustomAPIError extends Error {
	constructor(message) {
		super(message);
	}
}

class BadRequestError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = 400;
	}
}

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCodes = 404;
	}
}

class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = 401;
	}
}

class UnauthorizedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = 403;
	}
}

module.exports = {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
	UnauthorizedError,
};
