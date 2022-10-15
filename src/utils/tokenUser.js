const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const auth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    req.payload = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  auth };
