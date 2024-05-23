const Product = require('../../models/product')
const Cart = require('../../models/cart')

const getAllProducts = (req,res,next) => {
    Product.Productclass.fetchAll(prod => {
        res.render('shop/list-products', {products: prod, pageTitle: 'shop'})
    })
 }

 const getIndex = (req,res,next) => {
    Product.Productclass.fetchAll(prod => {
        res.render('shop/index', {products: prod, pageTitle: 'Home'})
    })
 }

 const getCart = (req,res,next) => {
   Cart.Cart.getFromCart(cart => {
      Product.Productclass.fetchAll(products => {
         const cartProducts = []
         for(product of products) {
            const cartProductData = cart.products.find( p=> p.id === product.id)
            if(cartProductData) {
               cartProducts.push({product: product, quantity: cartProductData.quantity})
            }
         }
         res.render('shop/cart' ,{pageTitle : 'Cart', products: cartProducts})
      })
   })
    
 }

 const addToCart = (req,res,next) => {
   const productId = req.body.productId
   const productPrice = req.body.productPrice
   Cart.Cart.addToCart(productId,productPrice)
   res.redirect("/cart")
   
 }

 const deleteItemFromCart = (req,res,next) =>{
   const productId = req.body.id
   const price =req.body.price
   Cart.Cart.deleteFromCart(productId, price)
   res.redirect("/cart")
 }

 const getProductDetail = (req,res,next) => {
   const productId = req.params.productId
   Product.Productclass.fetchAll(allProducts => {
      const requiredProduct = allProducts.find(p=> p.id === productId)
      res.render('shop/product-detail', {pageTitle: requiredProduct.title,product:requiredProduct })
   })
 }

 const getOrders = (req,res,next) => {
   res.render('shop/orders' ,{pageTitle : 'Orders'})
}
 

 module.exports = {
    getAllProducts:getAllProducts,
    getIndex:getIndex,
    getCart:getCart,
    getProductDetail:getProductDetail,
    getOrders:getOrders,
    addToCart:addToCart,
    deleteItemFromCart,deleteItemFromCart
 }