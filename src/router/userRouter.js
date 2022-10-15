const { Router } = require('express');
const userController = require('../controllers/userController');
const { 
  userValidation,
  validationDisplayName, 
  validationPassword,
  validationEmail,
  registerUserId,
} = require('../middlewares/validationUser');

const router = Router();

router.get('/', userController.getUser);
router.get('/:id', registerUserId, userController.getUserById);

router.post('/', 
userValidation,
validationDisplayName, 
validationPassword, 
validationEmail,
userController.createUser);

// router.delete('/me', userController.deleteMe);

module.exports = router;