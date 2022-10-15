const categoriesService = require('../services/categoriesService');

const getCategories = async (_req, res) => {
  try {
    const { type, message } = await categoriesService.getCategories();

    return res.status(type).json(message);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const { type, message } = await categoriesService.createCategories(name);
    return res.status(type).json(message);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createCategories,
  getCategories,
};