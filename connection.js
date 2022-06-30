const { Sequelize } = require('sequelize');

const PostModel = require('./models/post');
console.log(process.env.CONNECTION_STRING);
const sequelize = new Sequelize(process.env.CONNECTION_STRING);
require('dotenv').config();

return sequelize
  .authenticate()
  .then((result) => {
    console.log(`Postgress successfully connected!`);

    return PostModel.sync();
  })
  .then((result) => {
    console.log(`users table created`);
    return result;
  })
  .catch((error) => {
    console.error('Unable to connect to Postgress database:', error);
  });
