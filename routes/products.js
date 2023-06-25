const express = require("express")
const router = express.Router()

const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products")

module.exports = router