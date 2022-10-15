const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const seqlz = new Sequelize(config[env]);

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
  try {
      const post = await BlogPost.findOne({ where: { id },
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

const createPost = async (title, content, categoryIds, id) => {
  try {
    const result = await seqlz.transaction(async (transaction) => {
      const newBlogPost = await BlogPost.create({ title, content, userId: id }, { transaction });
      await Promise.all(
        categoryIds.map((categoryId) => PostCategory.create({ 
        postId: newBlogPost.id, categoryId }, { transaction })),
      );
      return newBlogPost;
    });

  return { type: 200, message: result };
  } catch (e) {
    return e;
  }
};

module.exports = {
  getPost,
  getPostId,
  createPost,
};