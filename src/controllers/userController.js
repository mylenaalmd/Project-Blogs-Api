const loginService = require('../services/loginService');
const userService = require('../services/userServices');

const createLogin = async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const { type, message } = await loginService.authentication(email, password);
    
    // console.log(type, 'type');
    return res.status(type).json(message);
  } catch (e) {
    console.error(e);
    return res.status(500).json('Internal error');
    }
  };

  const getUser = async (_req, res) => {
    try {
      const { type, message } = await userService.getUser();

      return res.status(type).json(message);
    } catch (e) {
      console.error(e);
      return res.status(500).json('Internal error');
    }
  };

  const getUserById = async (req, res) => {
    try {
      const { params: { id } } = req;
      const { type, message } = await userService.getUserById(id);
      return res.status(type).json(message);
    } catch (e) {
      console.log(e);
      return res.status(500).json('Internal error');
    }
  };

  const createUser = async (req, res) => {
    try {
      const { body } = req;
      const { type, message } = await userService.createUser(body);

      return res.status(type).json(message);
    } catch (e) {
      return res.status(500).json('Internal error');
    }
  };
  
module.exports = {
  createLogin,
  getUser,
  getUserById,
  createUser,
};