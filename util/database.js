const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db;
const mongoConnect = callback => {
  mongoClient
  .connect('mongodb+srv://dosapatirohith:iamrohith678@cluster0.njcdiew.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
  .then(client => {
    console.log('Connected')
    _db = client.db()
    callback()
  })
  .catch(err => console.log(err))
}

function getDb() {
  if(_db) return _db;
  throw 'No database found'
}
module.exports={
  mongoConnect,
  getDb
}
