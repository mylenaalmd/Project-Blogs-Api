const postService = require('../services/postService');
// const userService = require('../services/userServices');

const createPost = async (req, res) => {
  try {
    const { 
      body: { title, content, categoryIds } } = req;
      const { id } = req;
      console.log(id);
  const { type, message } = await postService.createPost(title, content, categoryIds, id);
  return res.status(type).json(message);
  } catch (e) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

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

const deletePost = async (req, res) => {
  const { params: { id } } = req;
  const userId = req.id;
  const checkPost = await postService.getPostTest(id);
  console.log(userId, checkPost, 'userId');
  if (!checkPost) return res.status(404).json({ message: 'Post does not exist' });
  if (Number(userId) !== Number(checkPost.dataValues.userId)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  await postService.deletePost(id);
  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  // const users = await postService.getPost();
  // if (!q) return res.status(200).json(users);
  const result = await postService.searchPost(q);
  return res.status(200).json(result);
};

// const updatePost = async (req, res) => {
  
// };

module.exports = { 
  getPost, 
  getPostId,
  createPost,
  deletePost,
  searchPost,
  // updatePost,
 };