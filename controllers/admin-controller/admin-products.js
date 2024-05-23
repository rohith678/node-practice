const Product = require('../../models/product')


const getAddProduct = (req,res,next) =>{
    res.render('admin/add-product.pug', {pageTitle : "Add products"})
}

const postAddProduct = (req,res,next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    const product = new Product.Productclass(null,title,imageURL,price,description)
    product.save()
    res.redirect("/")
}

const getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId
    Product.Productclass.fetchAll((products) => {
        const requiredProduct = products.find(p => p.id === productId)
        res.render('admin/add-product.pug',{pageTitle : "Edit products", edit: editMode, product: requiredProduct})
    })
}

const postEditProduct = (req,res, next) => {
    const productTitle = req.body.title
    const productPrice = req.body.price
    const productURL = req.body.imageURL
    const productDescription = req.body.description
    const productId = req.params.productId
    const product = new Product.Productclass(productId,productTitle, productURL, productPrice, productDescription)
    product.save()
    res.redirect("/admin-products")
}

const deleteProduct = (req,res,next) => {
    const productId = req.params.productId
    Product.Productclass.deleteById(productId)
    res.redirect("/admin-products")
}
const getAdminProducts = (req,res,next) => {
    Product.Productclass.fetchAll(prod => {
        res.render('admin/admin-products', {products: prod, pageTitle: 'Admin Products'})
    })
}

module.exports = {
    getAddProduct:getAddProduct,
    postAddProduct:postAddProduct,
    getAdminProducts:getAdminProducts,
    getEditProduct:getEditProduct,
    postEditProduct:postEditProduct,
    deleteProduct:deleteProduct
}