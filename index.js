const express = require('express')
const bodyParser = require('body-parser')
const path =require('path')

const adminRoutes = require('./routes/admin-routes')
const shopRoutes = require('./routes/shop-routes')
const errorPage = require('./controllers/error')
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
const sequelize = require('./util/database')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','pug')
app.set('views','views')

// one to many
User.hasMany(Product)
Product.belongsTo(User)
//one to one
Cart.belongsTo(User)
User.hasOne(Cart)
//many to many
Cart.belongsToMany(Product, {through:CartItem})
Product.belongsToMany(Cart, {through: CartItem})
//one to many
Order.belongsTo(User)
User.hasMany(Order)
//many to many
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user =>{ 
        console.log("user index" ,user)
        req.user = user
        next()
    })
    .catch(err => console.log(err))
    
})

app.use(adminRoutes.routes)
app.use(shopRoutes.routes)
app.use(errorPage.errorFunction)

sequelize.sync({force:true})
.then(result => {
    return User.findByPk(1)
})
.then(user => {
    if(!user) {
        return User.create({name: "Rohith" , email: "rohith@test.com"})
    }
    return user
})
.then(user => {
    return user.createCart()
})
.then(cart => app.listen(3000))
.catch(err => console.log(err))

