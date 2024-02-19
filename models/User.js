const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: [true, "Please provide name"] },
		email: {
			type: String,
			required: [true, "Please provide email"],
			validate: [validator.isEmail, "Please provide valid email"],
			unique: true,
		},
		avatar: { type: String },
		password: {
			type: String,
			required: [true, "Please provide password"],
			minlength: 6,
			select: false,
		},
		role: { type: String, enum: ["admin", "user"], default: "user" },
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWTToken = function () {
	return jwt.sign(
		{ _id: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
