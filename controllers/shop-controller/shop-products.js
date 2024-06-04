const Product = require('../../models/product')
const User = require("../../models/user")

const getAllProducts = (req,res,next) => {
    Product.fetchAll().then((prod => {
      res.render('shop/list-products', {products: prod, pageTitle: 'shop'})
    })).catch(err => console.log(err))
 }

 const getIndex = (req,res,next) => {
   Product.fetchAll().then((prod => {
      res.render('shop/index', {products: prod, pageTitle: 'Home'})
    })).catch(err => console.log(err))
 }

 const getCart = (req,res,next) => {
   req.user.getCartProducts()
   .then(products => {
      res.render('shop/cart' ,{pageTitle : 'Cart', products: products})
   })
   .catch(err => console.log(err))
 }

 const addToCart = (req,res,next) => {
   const productId = req.body.productId
   req.user.addToCart(productId)
   .then(result => {
      res.redirect("/cart")
   })
   .catch(err=> console.log(err))
}

 const deleteItemFromCart = (req,res,next) =>{
   const productId = req.body.id
   req.user.deleteItemFromCart(productId)
   .then(result => {
      res.redirect('/cart');
   })
   .catch(err => console.log(err))
 }

 const getProductDetail = (req,res,next) => {
   const productId = req.params.productId
   Product.findbyId(productId).then((prod => {
      res.render('shop/product-detail', {pageTitle: prod.title,product:prod })
    })).catch(err => console.log(err))
 }

 const getOrders = (req,res,next) => {
   req.user.getOrder()
   .then(orders => {
      console.log("Orders ", orders)
      res.render('shop/orders' ,{pageTitle : 'Orders'})
   })
}
 
const postOrder = (req, res, next ) => {
   req.user.addOrder()
   .then(result => {
      res.redirect("/orders")
   })
   .catch(err => console.log(err))
}
 module.exports = {
    getAllProducts:getAllProducts,
    getIndex:getIndex,
    getCart:getCart,
    getProductDetail:getProductDetail,
    getOrders:getOrders,
    addToCart:addToCart,
    deleteItemFromCart,deleteItemFromCart,
    postOrder:postOrder
 }