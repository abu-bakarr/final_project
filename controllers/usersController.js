const userModel = require('../models/users');

module.exports = {
  add: (req, res) => {
    var data = req.body;
    console.log(req.body);

    userModel
      .create(data)
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

  getAll: (req, res) => {
    // var query = req.query;
    userModel
      .findAll()
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
  getById: (req, res) => {
    const { id } = req.params;
    userModel
      .findOne({
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
  deleteOne: (req, res) => {
    const { id } = req.params;
    userModel
      .destroy({
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
    userModel
      .update(req.body, {
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
