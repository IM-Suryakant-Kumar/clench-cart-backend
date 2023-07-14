require("dotenv").config()
require("express-async-errors")

// extra security package
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const express = require("express")
const app = express()

const connectDB = require("./db/connect")
const authenticateUser = require("./middleware/authentication")
// routers
const auth = require("./routes/auth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const stripeRouter = require("./routes/stripe")
// const productsRouter = require("./routes/products")
// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		// legacyHeaders: false // Disable the `X-RateLimit-*` headers
	})
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/", (req, res) => {
	res.send("Clench Cart API")
})

// routes
app.use("/api/v1/auth", auth)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/carts", cartRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/checkout", stripeRouter)
// app.use("/api/v1/products", authenticateUser, productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}`)
		)
	} catch (err) {
		console.log(err)
	}
}

start()
