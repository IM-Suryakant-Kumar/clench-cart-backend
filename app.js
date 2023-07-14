require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// extra security package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// db
const connectDB = require("./db/connect");
// routers
const auth = require("./routes/auth");
const user = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// middleware
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		// legacyHeaders: false // Disable the `X-RateLimit-*` headers
	})
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
	res.send("Clench Cart API");
});

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

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
