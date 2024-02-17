require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db");
const { notFoundMiddleware, errorHandlerMiddleware } = require("./middleware");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/wishlists", wishlistRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

app.get("/", (req, res) => {
	res.status(200).send("<h2>Working...👌👍</h2>");
});

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () =>
			console.log(`Server is listening on port ${process.env.PORT}`)
		);
	} catch (err) {
		console.log(err);
	}
};
start();
