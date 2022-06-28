const { Sequelize } = require('sequelize');
const UserModel = require('./models/users');
console.log(process.env.CONNECTION_STRING);
const sequelize = new Sequelize(process.env.CONNECTION_STRING);
require('dotenv').config();

return sequelize
  .authenticate()
  .then((result) => {
    console.log(`Postgress successfully connected!`);
    return UserModel.sync();
  })
  .then((result) => {
    console.log(`Products table created`);
    return result;
  })
  .catch((error) => {
    console.error('Unable to connect to Postgress database:', error);
  });
