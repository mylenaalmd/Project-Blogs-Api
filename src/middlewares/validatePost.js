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
  // console.log(categoryIds);
  
  if (!title || !content || !categoryIds) { 
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }
  // const idI = categoryIds[0];
  // const idII = categoryIds[1];
  
  const arrayCategories = await Category.findAll();
  const validateCategory = arrayCategories
  .some((item) => categoryIds.includes(item.dataValues.id));
  console.log(validateCategory, 'valid');

  if (!validateCategory) { return res.status(400).json({ message: '"categoryIds" not found' }); }

  next();
};

module.exports = { validatePostId, postValidate };