const router = require('express').Router();
const controller = require('../controllers/usersController');

router.post('/', controller.add);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.deleteOne);
router.put('/:id', controller.update);

module.exports = router;
