const postService = require('../services/postService');

const getPost = async (_req, res) => {
  try {
    const { type, message } = await postService.getPost();
    return res.status(type).json(message);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getPostId = async (req, res) => {
  try {
    const { params: { id } } = req;
    const { type, message } = await postService.getPostId(id);
    return res.status(type).json(message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { 
  body: { title, content, categoryIds },
  payload: { id } } = req;
  const { type, message } = await postService.createPost(title, content, categoryIds, id);
  return res.status(type).json(message);
  } catch (e) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = { 
  getPost, 
  getPostId,
  createPost,
 };