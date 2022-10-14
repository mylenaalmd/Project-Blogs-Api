const { User } = require('../models');

const validateLogin = async (req, res, next) => {
  const { body: { email, password } } = req;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  try {
    const user = await User.findOne({
      where: { email, password },
      attributes: { exclude: ['password'] },
    });
    console.log(user, 'userValidade');

    if (!user) return res.status(400).json('Invalid fields');

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json('Internal error');
  }
};

module.exports = validateLogin;
