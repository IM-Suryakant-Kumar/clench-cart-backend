require("dotenv").config()

const express = require("express")
const app = express()

// routers
const productsRouter = require("./routes/products")
const authRouter = require("./routes/auth")
// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Clench Cart API")
})

// routes
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/auth", authRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}`)
		)
	} catch (err) {
		console.log(err)
	}
}

start()
