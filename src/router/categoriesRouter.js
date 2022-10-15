const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const { auth } = require('../utils/tokenUser');
const validateCategories = require('../middlewares/validateCategories');

const router = Router();

router.get('/', auth, categoriesController.getCategories);

router.post('/', validateCategories, auth, categoriesController.createCategories);

module.exports = router;