const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserModel = require('./users');

const sequelize = new Sequelize(
  'postgres://postgres:root@localhost:5432/alx-devmeet'
);

const PostModel = sequelize.define(
  'posts',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: DataTypes.STRING,
    name: DataTypes.STRING,
    likes: [
      {
        user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: UserModel,
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
    ],
    comments: [
      {
        user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: UserModel,
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        commentedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    avatar: DataTypes.STRING,
  },
  { timestamps: true }
);

PostModel.associate = (models) => {
  PostModel.belongsTo(models.UserModel, {
    foreignKey: 'user',
    targetKey: 'id',
  });
};

module.exports = PostModel;
