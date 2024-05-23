const express = require('express')

const adminProducts = require('../controllers/admin-controller/admin-products')

const route = express.Router()

route.get("/add-product",adminProducts.getAddProduct)

route.post("/add-product" , adminProducts.postAddProduct)

route.get("/admin-products", adminProducts.getAdminProducts)

route.get("/edit-product/:productId", adminProducts.getEditProduct)

route.post("/edit-product/:productId" , adminProducts.postEditProduct)

route.post("/delete-product/:productId", adminProducts.deleteProduct)

module.exports = {
    routes:route
}