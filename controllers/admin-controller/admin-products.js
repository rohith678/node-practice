const Product = require('../../models/product')


const getAddProduct = (req,res,next) =>{
    res.render('admin/add-product.pug', {pageTitle : "Add products"})
}

const postAddProduct = (req,res,next) => {
    const user = req.user
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    console.log("user ",user)
    user.createProduct({title, price, description,imageURL})
    .then((product) => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
}

const getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId
    Product.findByPk(productId)
    .then(product => {
        res.render('admin/add-product.pug',{pageTitle : "Edit products", edit: editMode, product: product})
    })
    .catch(err => console.log(err))
}

const postEditProduct = (req,res, next) => {
    const productTitle = req.body.title
    const productPrice = req.body.price
    const productURL = req.body.imageURL
    const productDescription = req.body.description
    const productId = req.params.productId
    Product.findByPk(productId)
    .then(product => {
        product.title= productTitle
        product.price= productPrice
        product.imageURL=productURL
        product.description= productDescription
        return product.save()
    }).then(result => res.redirect("/admin-products"))
    .catch(err => console.log(err))
}

const deleteProduct = (req,res,next) => {
    const productId = req.params.productId
    Product.findByPk(productId)
    .then(product => {
        console.log(product)
        return product.destroy()
    }).then(result=>{
        res.redirect("/admin-products")
    })
    .catch(err => console.log(err)) 
}
const getAdminProducts = (req,res,next) => {
    req.user.getProducts().then((prod => {
        res.render('admin/admin-products', {products: prod, pageTitle: 'Admin Products'})
      })).catch(err => console.log(err))
}

module.exports = {
    getAddProduct:getAddProduct,
    postAddProduct:postAddProduct,
    getAdminProducts:getAdminProducts,
    getEditProduct:getEditProduct,
    postEditProduct:postEditProduct,
    deleteProduct:deleteProduct
}