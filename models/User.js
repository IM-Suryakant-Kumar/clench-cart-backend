const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)

// const mongoose = require("mongoose")
// const validator = require("validator")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// const UserSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: [true, "Please provide name"],
// 		maxlength: 50,
// 		minlength: 3
// 	},
// 	email: {
// 		type: String,
// 		required: [true, "Please provide email"],
// 		validate: {
//             validator: validator.isEmail,
//             message: "Please provide email"
//         },
// 		unique: true
// 	},
// 	password: {
// 		type: String,
// 		required: [true, "Please provide password"],
// 		minlength: 6
// 	},
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user"
//     }
// })

// UserSchema.pre("save", async function () {
//     if(this.isModified("password")) return
// 	const salt = await bcrypt.genSalt(10)
// 	this.password = await bcrypt.hash(this.password, salt)
// })

// // UserSchema.methods.createJWT = function () {
// // 	return jwt.sign(
// // 		{ userId: this._id, name: this.name },
// // 		process.env.JWT_SECRET,
// // 		{ expiresIn: process.env.JWT_LIFETIME }
// // 	)
// // }

// UserSchema.methods.comparePassword = async function (candidatePassword) {
// 	const isMatch = await bcrypt.compare(candidatePassword, this.password)
// 	return isMatch
// }

// module.exports = mongoose.model("User", UserSchema)
