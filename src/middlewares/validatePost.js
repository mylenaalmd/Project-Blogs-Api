const { Category } = require('../models');
const postService = require('../services/postService');

const validatePostId = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { message } = await postService.getPostId(id);

    if (!message) return res.status(404).json({ message: 'Post does not exist' });
    next();
  } catch (e) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const postValidate = async (req, res, next) => {
  const { body: { title, content, categoryIds } } = req;

  if (!title || !content || !categoryIds) { 
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  const arrayCategories = await Category.findAll();
  const isvalid = arrayCategories.every((item) => categoryIds.includes(item.id));

  if (!isvalid) { return res.status(400).json({ message: '"categoryIds" not found' }); }

  next();
};

module.exports = { validatePostId, postValidate };