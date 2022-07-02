const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
  },
  { timestamps: true }
);

const Likes = sequelize.define('likes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

const Comments = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comments_text: DataTypes.STRING,
  comments_title: DataTypes.STRING,
  comments_avatar: DataTypes.STRING,
});

const UserModel = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
  },
  { timestamps: true },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, user.password);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

sequelize.sync({ alter: true });

Likes.belongsTo(PostModel);
Likes.belongsTo(UserModel);

Comments.belongsTo(PostModel);
Comments.belongsTo(UserModel);

PostModel.hasMany(Likes);
PostModel.hasMany(Comments);
PostModel.belongsTo(UserModel);

UserModel.hasOne(Likes);
UserModel.hasMany(Comments);
UserModel.hasMany(PostModel);

module.exports = { PostModel, UserModel, Likes, Comments };
