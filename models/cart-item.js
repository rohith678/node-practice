const sequelize = require("../util/database")
const {Sequelize, DataTypes} = require("sequelize")

const CartItem = sequelize.define("cartItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    quantity: DataTypes.INTEGER
})

module.exports = CartItem