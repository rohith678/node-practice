const Product = require('../../models/product')


const getAddProduct = (req,res,next) =>{
    res.render('admin/add-product.pug', {pageTitle : "Add products"})
}

const postAddProduct = (req,res,next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    const product = new Product(null,title,price,description,imageURL, req.user._id)
    product
    .save()
    .then(() => {
        console.log('Product created')
        res.redirect("/products")
    })
    .catch(err=> console.log(err))
    
}

const getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId
    Product.findbyId(productId)
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
    console.log(productId, productTitle, productPrice, productDescription, productURL)
    const product = new Product(productId,productTitle, productPrice, productDescription, productURL)
    product.save()
    .then(() => {
        res.redirect("/admin-products")
    })
    .catch(err => console.log(err))
}

const deleteProduct = (req,res,next) => {
    const productId = req.params.productId
    console.log(productId)
    Product.deleteById(productId)
    .then(result => {
        console.log(result)
        if(result) {
            res.redirect("/admin-products")
        } else {
            console.log("ERROR!")
        }
    })
    .catch(err => console.log(err)) 
}
const getAdminProducts = (req,res,next) => {
    Product.fetchAll().then((prod => {
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