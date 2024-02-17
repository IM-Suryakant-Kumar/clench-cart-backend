const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./not-found");

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware,
	...require("./authentication"),
};