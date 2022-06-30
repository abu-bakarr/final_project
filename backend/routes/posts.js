const router = require('express').Router();
const controller = require('../controllers/postsController');
const auth = require('../middleware/authMid');

router.post('/', auth, controller.createPost);
router.get('/', controller.getAllPost);
router.get('/:id', auth, controller.getPostById);
router.delete('/:id', auth, controller.deletePost);
router.put('/:id', auth, controller.updatePost);

router.post('/:id', auth, controller.likePost);

router.post('/:id/comments', auth, controller.commentPost);
router.get('/:id/comments', auth, controller.getAllCommentsOnSinglePost);

module.exports = router;
