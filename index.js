const express = require('express')
const bodyParser = require('body-parser')
const path =require('path')

const adminRoutes = require('./routes/admin-routes')
const shopRoutes = require('./routes/shop-routes')
const errorPage = require('./controllers/error')

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','pug')
app.set('views','views')

app.use(adminRoutes.routes)
app.use(shopRoutes.routes)
app.use(errorPage.errorFunction)
app.listen(3000)
