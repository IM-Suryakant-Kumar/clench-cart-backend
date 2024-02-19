require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const { notFoundMiddleware, errorHandlerMiddleware } = require("./middlewares");
const {
	authRouter,
	userRouter,
	productRouter,
	cartRouter,
	wishlistRouter,
	orderRouter,
	stripeRouter,
} = require("./routes");

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
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/order", orderRouter);
app.use("/checkout", stripeRouter);

app.get("/", (req, res) => {
	res.status(200).send("<h2>Working...👌👍</h2>");
});

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () =>
			console.log(`Server is listening on port ${process.env.PORT}`)
		);
	} catch (err) {
		console.log(err);
	}
})();
