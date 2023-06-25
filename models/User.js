const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		max: 50,
		min: 3
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email"
		],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		min: [6, "Password should be greater than 6 digits"]
	}
})

UserSchema.pre("save", async () => {
	const salt = await bcrypt.getSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = () => {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: JWT_LEFETIME }
	)
}

UserSchema.methods.comparePassword = async (candidatePassword) => {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model("User", UserSchema)
