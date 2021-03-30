const { Sequelize } = require("sequelize");
const Products = require('./models/products')
    // const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/productDB')

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
        console.error('Unable to connect to SQLite database:', error);
    })