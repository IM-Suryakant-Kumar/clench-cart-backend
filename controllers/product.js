const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

// CREATE PRODUCT
const createProduct = async (req, res) => {
	const product = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json(product);
};
// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
	const products = await Product.find();
	res.status(StatusCodes.OK).json(products);
};
// GET PRODUCT
const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	res.status(StatusCodes.OK).json(product);
};
// UPDATE PRODUCT
const updateProduct = async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	res.status(StatusCodes.CREATED).json(product);
};
// DELETE
const deleteProduct = async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({ msg: "Product has been deleted" });
};

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
};
