const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const getPost = async () => {
  try {
      const post = await BlogPost.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
      });
    return { type: 200, message: post };
    } catch (e) {
    return e;
  }
};

const getPostId = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  console.log(post);
     return { type: 200, message: post };
};
const getPostTest = async (id) => BlogPost.findByPk(id);

const createPost = async (title, content, categoryIds, userId) => {
    console.log(categoryIds);
  const result = await sequelize.transaction(async (transaction) => {
    const newBlogPost = await BlogPost.create({ title, content, userId }, { transaction });
    await Promise.all(
      categoryIds.map((categoryId) => PostCategory.create({ 
        postId: newBlogPost.dataValues.id, categoryId }, { transaction })),
        );
        return newBlogPost;
      });
      console.log(result);
        
  return { type: 201, message: result };
};

const deletePost = async (id) => {
   const result = await BlogPost.destroy(
    { where: { id } },
   );

   return result;
};

const searchPost = async (q) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }, 
    ],
  });
  return result;
};

const updatePost = async ({ title, content, id }) => {
  const result = await BlogPost.update({ title, content }, { where: { id } });
  return result;
};

module.exports = {
  getPost,
  getPostId,
  createPost,
  deletePost,
  searchPost,
  getPostTest,
  updatePost,
};