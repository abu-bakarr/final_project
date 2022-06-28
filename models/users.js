const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:root@localhost:5432/devmeet'
);

const UserModel = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.INTEGER,
  },
  { timestamps: true }
);

module.exports = UserModel;
