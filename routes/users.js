const router = require('express').Router();
const controller = require('../controllers/usersController');
const auth = require('../middleware/authMid');

router.post('/', controller.add);
router.get('/', controller.getAll);
router.get('/:id', auth, controller.getById);
router.delete('/:id', controller.deleteOne);
router.put('/:id', controller.update);

module.exports = router;
