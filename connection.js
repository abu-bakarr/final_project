const { Sequelize } = require("sequelize");
const Products = require('./models/products')
const sequelize = new Sequelize(process.env.CONNECTION_STRING)
require('dotenv').config()

return sequelize.authenticate()
    .then(result => {
        console.log(`Postgress successfully connected!`);
        return Products.sync();
    })
    .then(result => {
        console.log(`Products table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to Postgress database:', error);
    })