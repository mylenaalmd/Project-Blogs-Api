const { Router } = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../utils/tokenUser');
const { 
  userValidation,
  validationDisplayName, 
  validationPassword,
  validationEmail,
  registerUserId,
} = require('../middlewares/validationUser');

const router = Router();

router.get('/', auth, userController.getUser);
router.get('/:id', auth, registerUserId, userController.getUserById);

router.post('/', 
userValidation,
validationDisplayName, 
validationPassword, 
validationEmail,
userController.createUser);

module.exports = router;