const mongoConnect = require('../util/database');
const mongodb = require('mongodb')

class Product {
    constructor(id, title, price, description, imageURL, userId) {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageURL=imageURL
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    }

    save() {
        const db = mongoConnect.getDb()
        let dbOp;
        if(this._id) {
            //update
            dbOp = db.collection('products').updateOne({_id: this._id} , {$set: this})
        } else {
            //create
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
        .catch(err => console.log(err))
    }

    static fetchAll() {
        const db = mongoConnect.getDb()
        return db
        .collection('products')
        .find()
        .toArray()
        .then(products => {
            return products
        })
        .catch(err=> console.log(err))
    }

    static findbyId(id) {
        const db = mongoConnect.getDb()
        return db
        .collection('products')
        .find({_id: new mongodb.ObjectId(id) })
        .toArray()
        .then(products => {
            return products[0]
        })
        .catch(err => console.log(err))
    }

    static deleteById(id) {
        const db = mongoConnect.getDb()
        return db
        .collection('products')
        .deleteOne({_id: new mongodb.ObjectId(id)})
        .then(result => {
            return result ? true : false
        })
        .catch(err => console.log(err))
    }
}

module.exports = Product
