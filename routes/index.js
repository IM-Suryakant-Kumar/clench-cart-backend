const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const wishlistRouter = require("./wishlist");
const orderRouter = require("./order");
const stripeRouter = require("./stripe");

module.exports = {
	authRouter,
	userRouter,
	productRouter,
	cartRouter,
	wishlistRouter,
	orderRouter,
	stripeRouter,
};
