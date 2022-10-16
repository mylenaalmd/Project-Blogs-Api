const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../utils/tokenUser');
const { 
  userValidation,
  validationDisplayName, 
  validationPassword,
  validationEmail,
  registerUserId,
} = require('../middlewares/validationUser');

const router = express.Router();

router.get('/', auth, userController.getUser);
router.get('/:id', auth, registerUserId, userController.getUserById);

router.post('/', 
userValidation,
validationDisplayName, 
validationPassword, 
validationEmail,
userController.createUser);

router.delete('/me', auth, userController.deleteMe);

module.exports = router;