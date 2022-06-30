const { PostModel, UserModel, Likes } = require('../models/post');
const gravatar = require('gravatar');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  createPost: async (req, res) => {
    const { text, name } = req.body;
    const tokenUser = req.user;

    const user = await UserModel.findOne({
      where: {
        email: tokenUser.email,
      },
    });
    if (!user) {
      res.json({ error: 'Email exist' });
      return;
    }

    const resp = await PostModel.create({
      text,
      name,
      userId: user.dataValues.id,
    });
    res.json({
      token: resp,
      Message: 'You have created a new post',
    });
  },

  getAllPost: async (req, res) => {
    try {
      const allPosts = await PostModel.findAll();
      if (allPosts) {
        res.json({
          confirm: 'Succes',
          data: allPosts,
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
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const singleUser = await PostModel.findOne({
        where: {
          id: id,
        },
      });
      if (singleUser) {
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
  likePost: async (req, res) => {
    const { id } = req.params;
    try {
      const singlePost = await PostModel.findOne({
        where: {
          id: id,
        },
      });
      if (!singlePost)
        return res.json({
          message: 'post does not exist',
        });

      const resp = await Likes.create({
        postId: singlePost.dataValues.id,
      });
      res.json({
        confirm: 'success',
        data: resp,
      });
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: 'invalid input',
      });
    }
  },
  commentPost: async (req, res) => {
    const { id } = req.params;
    const { comments_text, comments_title } = req.body;

    let avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    try {
      const singlePost = await PostModel.findOne({
        where: {
          id: id,
        },
      });
      if (!singlePost)
        return res.json({
          message: 'post does not exist',
        });

      const resp = await Comment.create({
        avatar,
        comments_text,
        comments_title,
        postId: singlePost.dataValues.id,
      });

      res.json({
        confirm: 'success',
        data: resp,
      });
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: 'invalid input',
      });
    }
  },

  deletePost: (req, res) => {
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
  updatePost: (req, res) => {
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
