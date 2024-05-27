const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')
const Cart = require('./cart')

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING
})

module.exports = Product