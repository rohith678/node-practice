const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { where } = require('sequelize')

const getAllProducts = (req,res,next) => {
    req.user.getProducts().then((prod => {
      res.render('shop/list-products', {products: prod, pageTitle: 'Home'})
    })).catch(err => console.log(err))
 }

 const getIndex = (req,res,next) => {
   req.user.getProducts().then((prod => {
      res.render('shop/index', {products: prod, pageTitle: 'Home'})
    })).catch(err => console.log(err))
 }

 const getCart = (req,res,next) => {
   req.user.getCart()
   .then(cart => {
      return cart.getProducts()
   })
   .then(products => {
      console.log("Products cart" , products)
      res.render('shop/cart' ,{pageTitle : 'Cart', products: products})
   })
   .catch(err => console.log(err))
 }

 const addToCart = (req,res,next) => {
   const productId = req.body.productId
   req.user.getCart()
   .then(cart =>
      cart.getProducts({where: {id: productId}})   
      .then(products => {
         const product = products[0]
         if(product) {
            //product exists
            const oldQuantity = product.cartItem.quantity
            const newQuantity = oldQuantity+1
            cart.addProduct(product, {through: {quantity:newQuantity}})
            .then(result =>res.redirect("/cart") )
            .catch(err => console.log(err))
         } else {
            Product.findByPk(productId)
            .then(product => {
               cart.addProduct(product, {through: {quantity:1}})
               .then(result =>res.redirect("/cart") )
               .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
         }
      })
   )
   .catch(err => console.log(err))
}

 const deleteItemFromCart = (req,res,next) =>{
   const productId = req.body.id
   req.user.getCart()
   .then(cart => {
      return cart.getProducts ({ where: { id: productId } });
   })
   .then(products => {
      const product = products [0];
      return product.cartItem.destroy();
   })
   .then(result => {
      res.redirect('/cart');
   })
   .catch(err => console.log(err))
 }

 const getProductDetail = (req,res,next) => {
   const productId = req.params.productId
   req.user.getProducts({where: {
      id:productId
   }}).then((prod => {
      console.log(prod)
      res.render('shop/product-detail', {pageTitle: prod.title,product:prod[0] })
    })).catch(err => console.log(err))
 }

 const getOrders = (req,res,next) => {
   res.render('shop/orders' ,{pageTitle : 'Orders'})
}
 
const postOrder = (req, res, next ) => {
   let fetchedCart;
   req.user.getCart()
   .then(cart => {
      fetchedCart=cart;
      return cart.getProducts()
   })
   .then(products => {
      req.user.createOrder()
      .then(order => {
         order.addProducts(products.map(product=> {
            product.orderItem = {quantity: product.cartItem.quantity}
            return product;
         }))
      })
      .catch(err=> console.log(err))
   })
   .then(result => {
      fetchedCart.setProducts(null)
   })
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