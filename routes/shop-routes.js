const express = require('express')
const shopProducts = require('../controllers/shop-controller/shop-products')
const isAuth = require("../middleware/is-auth")

const route = express.Router()

route.get("/" , shopProducts.getIndex)
route.get("/products" , shopProducts.getAllProducts)
route.get("/product/:productId", shopProducts.getProductDetail)
route.get("/cart", isAuth.isAuth,shopProducts.getCart)
route.post("/cart",isAuth.isAuth, shopProducts.addToCart)
route.get("/orders", isAuth.isAuth,shopProducts.getOrders)
route.post("/delete-cart", isAuth.isAuth,shopProducts.deleteItemFromCart)
route.post('/create-order', isAuth.isAuth,shopProducts.postOrder)

module.exports = {
    routes:route
}