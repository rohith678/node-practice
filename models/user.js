const sequelize = require('../util/database')
const {Sequelize,DataTypes} = require("sequelize")

const User = sequelize.define('user', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    email:DataTypes.STRING
})

module.exports= User