
const getAllProducts = async (req, res) => {
    res.send("all products")
}

const getProduct = async (req, res) => {
    res.send("get single products")
}

const createProduct = async (req, res) => {
    res.send("Create product")
}

const updateProduct = async (req, res) => {
    res.send("Update product")
}

const deleteProduct = async (req, res) => {
    res.send("delete product")
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}