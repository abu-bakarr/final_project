const router = require('express').Router();
const authController = require('../controllers/autthController');

router.post('/', authController.Login);

module.exports = router;
