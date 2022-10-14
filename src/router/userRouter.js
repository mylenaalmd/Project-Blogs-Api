const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.post('/', userController.createUser);

router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);

// router.delete('/me', userController.deleteMe);

module.exports = router;