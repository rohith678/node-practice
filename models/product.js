const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const p = path.join(__dirname, ".." ,"data" ,"products.json")

getDataFromFile = (cb) => {
    fs.readFile(p,(err, fileContent) => {
        if(err) {
            cb([])
        }
        else {
            cb(JSON.parse(fileContent))
        }
    })
}
class Product {
    constructor(id,title, imageURL, price, description) {
        this.id=id
        this.title = title
        this.imageURL=imageURL
        this.price=price
        this.description=description
    }
    
    save() {
        getDataFromFile((prods) => {
            if(this.id) {
                const requiredProductIndex = prods.findIndex(p=> p.id==this.id)
                let updatedProducts;
                updatedProducts=[...prods]
                updatedProducts[requiredProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err)
                })
            } else {
                this.id=Math.random().toString()
                prods.push(this)
                fs.writeFile(p, JSON.stringify(prods), (err)=>{
                    console.log(err)
                })
            }
            
        })
    }

    static deleteById(id) {
        getDataFromFile(products => {
            const remainingProducts = products.filter(p => p.id !=id)
            const requiredProduct = products.find(p=> p.id===id)
            fs.writeFile(p,JSON.stringify(remainingProducts), (err) => {
                if(!err) {
                    Cart.Cart.deleteFromCart(id,requiredProduct.price)
                }
            })
        })
    }

    static fetchAll(cb) {
        getDataFromFile(cb)
    }
}

module.exports = {
    Productclass: Product
}