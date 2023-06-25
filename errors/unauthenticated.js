const { statusCodes } = require("http-status-codes")
const CustomAPIError = require("./custom-error")

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = statusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError