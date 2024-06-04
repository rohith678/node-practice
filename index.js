const express = require('express')
const bodyParser = require('body-parser')
const path =require('path')

const adminRoutes = require('./routes/admin-routes')
const shopRoutes = require('./routes/shop-routes')
const errorPage = require('./controllers/error')
const User = require('./models/user')

const mongoConnect = require('./util/database')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','pug')
app.set('views','views')

app.use((req,res,next) => {
    User.findById('6657812423cc8f1887435a25')
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id)
        next()
    })
    .catch(err=> console.log(err))
}) 

app.use(adminRoutes.routes)
app.use(shopRoutes.routes)
app.use(errorPage.errorFunction)

mongoConnect.mongoConnect(() => {
    app.listen(3000)
})
