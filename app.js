require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// extra security package
const helmet = require("helmet");
const xss = require("xss-clean");
// DB
const connectDB = require("./db/connect");
// ROUTERS
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishlist");
const order = require("./routes/order");
const stripe = require("./routes/stripe");
// ERROR HANDLER
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(xss());
// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/products", product);
app.use("/api/v1/carts", cart);
app.use("/api/v1/wishlists", wishlist);
app.use("/api/v1/orders", order);
app.use("/api/v1/checkout", stripe);

app.get("/", (req, res) => {
	res.status(200).send("<h2>Working...👌👍</h2>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () =>
			console.log(`Server is listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.log(err);
	}
};

start();
