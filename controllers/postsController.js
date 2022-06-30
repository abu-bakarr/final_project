const { PostModel, UserModel, Comments, Likes } = require('../models/post');
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
    var count;
    try {
      const singleCount = await PostModel.findOne({
        where: {
          id: id,
        },
      });
      if (singleCount) {
        res.json({
          confirm: 'success',
          data: singleCount,
        });
      }
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: count,
      });
    }
  },
  likePost: async (req, res) => {
    const { id } = req.params;
    const tokenUser = req.user;

    try {
      const postCount = await PostModel.count({
        where: {
          id: id,
        },
      });
      const singlePost = await PostModel.findOne({
        where: {
          id: id,
        },
      });

      if (!singlePost) {
        return res.json({
          message: 'post does not exist',
        });
      }
      console.log('meee=> ' + tokenUser.id);

      const alreadyLikes = await Likes.count({
        where: { userId: tokenUser.id, postId: singlePost.dataValues.id },
      });

      if (alreadyLikes === 0) {
        const resp = await Likes.create({
          postId: singlePost.dataValues.id,
          userId: tokenUser.id,
        });
        res.json({
          confirm: 'success',
          data: resp,
        });
      }
      if (alreadyLikes >= 1) {
        res.json({
          message: 'you you have unlike this post',
          data: unlike,
        });
      }
      return;
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: err,
      });
    }
  },
  commentPost: async (req, res) => {
    const { id } = req.params;
    const { comments_text, comments_title } = req.body;
    const tokenUser = req.user;

    console.log('Body =>', req.body);

    let avatar = gravatar.url(comments_text, {
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
      if (!singlePost) {
        return res.json({
          message: 'post does not exist',
        });
      }

      const resp = await Comments.create({
        comments_avatar: avatar,
        comments_text,
        comments_title,
        postId: singlePost.dataValues.id,
        userId: tokenUser.id,
      });

      if (resp) {
        return res.json({
          confirm: 'success',
          data: resp,
        });
      }
      res.json({
        confirm: 'fail',
        data: 'fail to fetch data',
      });
      return;
    } catch (err) {
      res.json({
        confirm: 'fail',
        data: 'invalid input',
      });
    }
  },
  getAllCommentsOnSinglePost: async (req, res) => {
    const { id } = req.params;

    try {
      const singlePost = await PostModel.findOne({
        where: {
          id: id,
        },
      });
      if (!singlePost) {
        return res.json({
          message: 'post does not exist',
        });
      }

      const allComment = await Comments.findAll({
        where: { postId: singlePost.dataValues.id },
      });

      console.log('allComment =>', allComment);

      if (allComment) {
        res.json({
          confirm: 'Succes',
          data: allComment,
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

  deletePost: async (req, res) => {
    const { id } = req.params;
    const tokenUser = req.user;

    try {
      const deletePost = await PostModel.findOne({
        where: { id: id, userId: tokenUser.id },
      });

      console.log('deletePost =>', deletePost);

      if (deletePost) {
        res.json({
          confirm: 'Succes',
          data: deleteComment,
        });
        return;
      }
      res.json({
        confirm: 'Succes',
        data: [],
      });
    } catch (err) {
      res.json({});
    }
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const tokenUser = req.user;

    await PostModel.update(req.body, {
      where: {
        id: id,
        userId: tokenUser.id,
      },
    })
      .then((post) => {
        res.json({
          confirm: 'Succes',
          data: post,
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
