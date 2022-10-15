const { User } = require('../models');
const { getUserById } = require('../services/userServices');

const expReg = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const userValidation = (req, res, next) => {
  const { body: { displayName, email, password } } = req;

  const infos = displayName && email && password;

  if (!infos) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validationDisplayName = (req, res, next) => {
  const { body: { displayName } } = req;
  console.log(displayName);

    if (displayName.length < 8) {
      return res.status(400).json(
       { message: '"displayName" length must be at least 8 characters long' },
      );
    }

  next();
};

const validationEmail = async (req, res, next) => {
  const { body: { email } } = req;
  const emailFormated = email.match(expReg);

  if (!emailFormated) {
 return res.status(400).json({
    message: '"email" must be a valid email',
  }); 
}

try {
  const user = await User.findOne({ where: { email } });
  
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
} catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const validationPassword = (req, res, next) => {
  const { body: { password } } = req;
  
  if (password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be at least 6 characters long' },
);
  }
  next();
};

const registerUserId = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { message } = await getUserById(id);

    if (!message) {
      return res.status(404).json(
        { message: 'User does not exist' },
      ); 
    }

  next();
  } catch (e) {
    return res.status(500).json({ message: 'Internal error' }); 
  }
};

module.exports = {
  validationDisplayName,
  validationPassword,
  userValidation,
  registerUserId,
  validationEmail,
};