const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, "..","data","cart.json")

class Cart {
    static addToCart(productId, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            var cart = {products:[], totalPrice: 0}
            if(!err) {
               cart = JSON.parse(fileContent)
            }
            const requiredProductIndex = cart.products.findIndex(c => c.id === productId)
            const requiredProduct = cart.products[requiredProductIndex]
            var updatedProduct;
            if(requiredProduct) {
               updatedProduct = {...requiredProduct}
               updatedProduct.quantity = updatedProduct.quantity+1
               cart.products= [...cart.products]
               cart.products[requiredProductIndex] = updatedProduct
            } else {
               updatedProduct = {id: productId, quantity:1}
               cart.products=[...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart) , err => {
               console.log(err)
            })
         })
    }

    static deleteFromCart(id, price) {
      fs.readFile(p, (err, fileContent) => {
         if(err) {
            return;
         }
         const cart = JSON.parse(fileContent)
         const requiredProduct = cart.products.find(p => p.id === id)
         const requiredProductQty = requiredProduct.quantity
         const remainingProducts = cart.products.filter( p=> p.id !== id)
         const cartPrice = cart.totalPrice - requiredProductQty*price 
         var updatedCart= {...cart};
         updatedCart.products = remainingProducts;
         updatedCart.totalPrice=cartPrice
         fs.writeFile(p, JSON.stringify(updatedCart) , (err) => {
            console.log(err)
         })
      })
    }

    static getFromCart(cb) {
      fs.readFile(p, (err, fileContent) => {
         if(err) {
            return;
         } 
         const cart = JSON.parse(fileContent)
         cb(cart)
      })
    }
}

module.exports = {
    Cart:Cart
}