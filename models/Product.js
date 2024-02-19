const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide product title"],
			trim: true,
		},
		desc: {
			type: String,
			required: [true, "Please provide product description"],
		},
		img: { type: String, required: [true, "Please provide pruduct image"] },
		categories: { type: Array },
		size: { type: Array },
		color: { type: Array },
		price: { type: Number, required: [true, "Please provide product price"] },
		inStock: { type: Boolean, default: 1 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
