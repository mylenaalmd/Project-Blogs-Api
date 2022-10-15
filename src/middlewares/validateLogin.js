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
    
    if (!user) return res.status(400).json({ message: 'Invalid fields' });
    // console.log(user, 'userValidade');

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = validateLogin;
