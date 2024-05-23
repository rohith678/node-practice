const express = require('express')
const shopProducts = require('../controllers/shop-controller/shop-products')

const route = express.Router()

route.get("/" , shopProducts.getIndex)
route.get("/products" , shopProducts.getAllProducts)
route.get("/product/:productId", shopProducts.getProductDetail)
route.get("/cart", shopProducts.getCart)
route.post("/cart", shopProducts.addToCart)
route.get("/orders", shopProducts.getOrders)
route.post("/delete-cart", shopProducts.deleteItemFromCart)

module.exports = {
    routes:route
}