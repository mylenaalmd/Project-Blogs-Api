const { Router } = require('express');
const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');

const router = Router();

router.post('/', validateLogin, userController.createLogin);

module.exports = router;