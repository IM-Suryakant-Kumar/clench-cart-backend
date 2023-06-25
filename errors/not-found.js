const { statusCodes } = require("http-status-codes")
const CustomAPIError = require("./custom-error")

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCodes = statusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError

