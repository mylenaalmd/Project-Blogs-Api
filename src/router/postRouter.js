const express = require('express');
const auth = require('../utils/tokenUser');
const postController = require('../controllers/postController');
const { validatePostId, postValidate } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/search', auth, postController.searchPost);
router.post('/', auth, postValidate, postController.createPost);
router.get('/', auth, postController.getPost);
router.get('/:id', auth, validatePostId, postController.getPostId);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;