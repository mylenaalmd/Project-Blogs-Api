const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const getUserById = async (id) => {
  try {
      const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });
  
        return { type: 200, message: user };
  } catch (e) {
    return e;
  }
};

const getUser = async () => {
  try {
      const user = await User.findAll({
        attributes: { exclude: ['password'] },
    });
  
        return { type: 200, message: user };
  } catch (e) {
    return e;
  }
};

const createUser = async ({ displayName, email, password, image = '' }) => {
  try {
    const newUser = await User.create({ displayName, email, password, image });

    const token = generateToken(newUser.dataValues);

      return { type: 201, message: { token } };
} catch (e) {
  return e;
}
};

const deleteMe = async (id) => {
  await User.destroy(
   { where: { id } },
  );
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  deleteMe,
};