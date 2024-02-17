const { Product } = require("../models");

const createProduct = async (req, res) => {
	const product = await Product.create(req.body);
	res
		.status(201)
		.json({ success: true, product, message: "Product created successfully" });
};

const getAllProducts = async (req, res) => {
	const products = await Product.find();
	res.status(200).json({ success: true, products });
};

const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	res.status(200).json({ success: true, product });
};

const updateProduct = async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res
		.status(201)
		.json({ success: true, product, message: "Product updated successfully" });
};

const deleteProduct = async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Product has been deleted" });
};

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
