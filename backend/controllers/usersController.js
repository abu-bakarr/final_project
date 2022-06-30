const { UserModel } = require('../models/post');
const gravatar = require('gravatar');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  add: async (req, res) => {
    var { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    let avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.json({ error: 'Email exist' });
      return;
    }

    const resp = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      avatar,
    });
    const payload = {
      user: {
        firstName,
        lastName,
        email,
        avatar,
      },
    };

    return jsonwebtoken.sign(
      payload,
      'secretKey',
      {
        expiresIn: '10d',
      },
      (err, token) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(token);
        }
      }
    );
  },

  getAll: async (req, res) => {
    try {
      const allUsers = await UserModel.findAll();
      if (allUsers) {
        res.json({
          confirm: 'Succes',
          data: allUsers,
        });
        return;
      }
      res.json({
        confirm: 'Succes',
        data: [],
      });
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: err,
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const singleUser = await UserModel.findOne({
        where: {
          id: id,
        },
      });
      if (singleUser) {
        res.json({
          confirm: 'Succes',
          data: singleUser,
        });
        return;
      }
      res.json({
        confirm: 'Not Exist',
        data: [],
      });
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: 'invalid input',
      });
    }
  },
  deleteOne: (req, res) => {
    const { id } = req.params;
    UserModel.destroy({
      where: {
        id: id,
      },
    })
      .then((users) => {
        res.json({
          confirm: 'Succes',
          data: users,
        });
      })
      .catch((err) => {
        res.json({
          confirm: 'fail',
          data: err.message,
        });
      });
  },
  update: (req, res) => {
    const { id } = req.params;
    UserModel.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((users) => {
        res.json({
          confirm: 'Succes',
          data: users,
        });
      })
      .catch((err) => {
        res.json({
          confirm: 'fail',
          data: err.message,
        });
      });
  },
};
