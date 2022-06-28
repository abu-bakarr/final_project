const userModel = require('../models/users');

module.exports = {
  Login: (req, res) => {
    console.log(req.body);

    const { email } = req.body;
    userModel
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        res.json({
          confirm: 'Succes',
          data: user,
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
