const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		productId: { type: String, required: true },
		quantity: { type: Number, default: 1 },
		color: { type: String, required: true },
		size: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
