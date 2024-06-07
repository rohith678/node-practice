const express = require('express')
const bodyParser = require('body-parser')
const path =require('path')
const session = require('express-session')
const mongodb = require('mongodb')
const mongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')

const adminRoutes = require('./routes/admin-routes')
const shopRoutes = require('./routes/shop-routes')
const authRoutes = require('./routes/auth-routes')
const errorPage = require('./controllers/error')
const User = require('./models/user')

const mongoConnect = require('./util/database')

const store = mongoDBStore({
    uri: 'mongodb+srv://dosapatirohith:iamrohith678@cluster0.njcdiew.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0',
    collection:'sessions'
})

const app = express();

const csrfProtection = csrf()
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({secret:'SECRET', resave: false, saveUninitialized: false , store:store}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','pug')
app.set('views','views')

app.use(csrfProtection)
app.use(flash())
app.use((req,res,next) => {
    if(!req.session.user) {
        next()
    } else {
        User.findById(req.session.user._id)
        .then(user => {
            req.user = new User(user.name, user.email, user.password,user.cart, new mongodb.ObjectId(user._id))
            next()
        })
        .catch(err=> console.log(err))
    }
}) 

app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use(shopRoutes.routes)
app.use(authRoutes.routes)
app.use(adminRoutes.routes)

app.use(errorPage.errorFunction)

mongoConnect.mongoConnect(() => {
    app.listen(3000)
})
