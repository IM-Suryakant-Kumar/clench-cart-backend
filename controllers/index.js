const stripeCheckout = require("./stripe");

module.exports = {
	...require("./auth"),
	...require("./user"),
	...require("./product"),
	...require("./cart"),
	...require("./wishlist"),
	...require("./order"),
	stripeCheckout,
};
