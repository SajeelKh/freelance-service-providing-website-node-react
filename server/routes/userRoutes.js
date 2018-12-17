const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', userController.getAll);
router.post('/authenticate', userController.authenticate);
router.post('/signup', userController.signup);

module.exports = router;