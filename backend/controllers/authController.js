const { UserModel } = require('../models/post');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  Login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.json({ error: 'User not found' });
        return;
      }

      const userPass = user.dataValues.password;
      const isMatch = await bcrypt.compareSync(password, userPass);

      if (!isMatch) {
        return res.json({ error: 'Password does not match' });
      }

      const payload = {
        user: {
          email,
          id: user.dataValues.id,
          name: user.dataValues.firstName,
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
    } catch (error) {
      const response = {
        status: 500,
        data: {},
        error: {
          message: 'user match failed',
        },
      };
      res.json(response);
      return;
    }
  },
};
