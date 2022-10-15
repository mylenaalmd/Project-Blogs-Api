const { Category } = require('../models');

const getCategories = async () => {
  try {
      const user = await Category.findAll();
  
        return { type: 200, message: user };
    } catch (e) {
    console.error(e);
    return e;
  }
};

const createCategories = async (name) => {
  try {
    const newCategory = await Category.create({ name });
    return { type: 201, message: newCategory };
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = { 
  getCategories, 
  createCategories,
};