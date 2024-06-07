const express = require('express')
const isAuth = require('../middleware/is-auth')

const adminProducts = require('../controllers/admin-controller/admin-products')

const route = express.Router()

route.get("/add-product",isAuth.isAuth,adminProducts.getAddProduct)
route.post("/add-product" ,isAuth.isAuth, adminProducts.postAddProduct)
route.get("/admin-products",isAuth.isAuth, adminProducts.getAdminProducts)
route.get("/edit-product/:productId",isAuth.isAuth, adminProducts.getEditProduct)
route.post("/edit-product/:productId" ,isAuth.isAuth, adminProducts.postEditProduct)
route.post("/delete-product/:productId", isAuth.isAuth,adminProducts.deleteProduct)

module.exports = {
    routes:route
}