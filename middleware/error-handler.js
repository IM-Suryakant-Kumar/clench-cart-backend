const { statusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later"
    }

    res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler