require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// extra security package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");
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
// app.use(
// 	rateLimiter({
// 		windowMs: 15 * 60 * 1000, // 15 minutes
// 		max: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 		// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 		// legacyHeaders: false // Disable the `X-RateLimit-*` headers
// 	})
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	//To allow requests from client
	origin: [ process.env.CLIENT_URL, process.env.ADMIN_URL ],
	credentials: true
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(xss());
// TESTING
app.get("/", (req, res) => {
	res.send("Clench Cart API");
});
// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/products", product);
app.use("/api/v1/carts", cart);
app.use("/api/v1/wishlists", wishlist);
app.use("/api/v1/orders", order);
app.use("/api/v1/checkout", stripe);

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
