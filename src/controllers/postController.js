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

const updatePost = async (req, res) => {
  const { params: { id } } = req;
  const { body: { title, content } } = req;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  // const userId = req.id;
  // const users = await userService.getUserById(userId);
  // const userPostId = await postService.createPost(id, title, content, userId);
  // console.log(userPostId, 'number');
  // const userPosts = user.posts;
  // const validatePost = users.some((user) => user.dataValues.id === Number(id));
  // if (users.message.dataValues.id !== Number()) {
  //   return res.status(401).json({ message: 'Unauthorized user' });
  // }
  await postService.updatePost({ title, content, id });
  const result = await postService.getPostId(id);
  return res.status(200).json(result);
};

module.exports = { 
  getPost, 
  getPostId,
  createPost,
  deletePost,
  searchPost,
  updatePost,
 };