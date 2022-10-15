const { Router } = require('express');
const { auth } = require('../utils/tokenUser');
const postController = require('../controllers/postController');
const { validatePostId, postValidate } = require('../middlewares/validatePost');

const router = Router();

router.get('/', auth, postController.getPost);
router.get('/:id', auth, validatePostId, postController.getPostId);
router.post('/', auth, postValidate, postController.createPost);
// router.put('/:id', postController.updatePost);
// router.delete('/:id', postController.deletePostId);

module.exports = router;