const mongoConnect = require('../util/database')
const mongodb = require('mongodb')

class User {
    constructor(name, email, cart, id) {
        this.name=name
        this.email = email
        this.cart= cart
        this._id =id
    }

    save() {
        const db = mongoConnect.getDb()
        return db
        .collection('users')
        .save(this)
        .then(result => {
            console.log('USER CREATED')
        })
        .catch(err => console.log(err))
    }

    static findById(id) {
        const db = mongoConnect.getDb()
        return db
        .collection('users')
        .find({_id: new mongodb.ObjectId(id)})
        .toArray()
        .then(users => {
            return users[0]
        })
        .catch(err=> console.log(err))
    }

    addToCart(productId) {
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString()===productId.toString())
        let newQuantity=1;
        const updatedCartItem = [...this.cart.items]
        if(cartProductIndex >= 0 ){
            newQuantity = this.cart.items[cartProductIndex].quantity+1
            updatedCartItem[cartProductIndex].quantity = newQuantity
        } else  {
            updatedCartItem.push({productId: new mongodb.ObjectId(productId), quantity: newQuantity})
        }
        const updatedCart = {items: updatedCartItem}
        const db = mongoConnect.getDb()
        return db.collection('users')
        .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
        .then(result=> {
            console.log("PRODUCT ADDED TO CART")
            return result
        })  
        .catch(err=> console.log(err))
    }

    getCartProducts() {
        const db = mongoConnect.getDb()
        const productIds= this.cart.items.map( i => {
            return i.productId
        })
        return db.collection('products').find({_id: {$in : productIds}}).toArray()
        .then(products => {
            return products.map(p => {
                return {...p, quantity: this.cart.items.find(i=>{
                    return i.productId.toString()===p._id.toString()
                }).quantity}
            })
        })
    }

    deleteItemFromCart(productId) {
        let updatedCartItems = this.cart.items
        .filter(item => item.productId.toString() !== productId.toString())
        const db = mongoConnect.getDb()
        return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{
            $set: {cart: {items: updatedCartItems}}
        })
    }

    addOrder() {
        const db = mongoConnect.getDb()
        return this.getCartProducts().then(products => {
            const order = {
                items: products,
                user: {
                    id: new mongodb.ObjectId(this._id),
                    name: this.name
                }
            }
            return db
            .collection('orders')
            .insertOne(order)
        })
        .then(result =>{
            this.cart=[]
            return db
            .collection('users')
            .updateOne({_id: new mongodb.ObjectId(this._id)},{$set: {cart:{items:[]}}})
        })
    }

    getOrder() {
        const db = mongoConnect.getDb()
        return db
        .collection('orders')
        .find({'user.id' : new mongodb.ObjectId(this._id)})
        .toArray()
    }
}

module.exports= User