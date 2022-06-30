const router = require('express').Router();
const controller = require('../controllers/postsController');
const auth = require('../middleware/authMid');

router.post('/', auth, controller.createPost);
router.get('/', controller.getAllPost);
router.get('/:id', auth, controller.getPostById);
router.post('/:id', auth, controller.likePost);
router.delete('/:id', auth, controller.deletePost);
router.put('/:id', auth, controller.updatePost);

module.exports = router;
