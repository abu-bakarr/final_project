const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/productDB')

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    mrp: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    isPublished: DataTypes.BOOLEAN
}, { timestamps: false });

module.exports = Product;