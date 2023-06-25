require("dotenv").config()

const express = require("express")
const app = express()

// route
app.get("/", (req, res) => {
    res.send("Clench Cart API")
})

const port = process.env.PORT || 3000

const start = async () => {
	try {
		app.listen(port, console.log(`Server is listening on port ${port}`))
	} catch (err) {
		console.log(err)
	}
}

start()
