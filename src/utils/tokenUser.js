require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    // console.log(token, 'token');
    const decoded = jwt.verify(token, secret);
    req.id = decoded.id;
    req.userName = decoded.displayName;
    req.userEmail = decoded.email;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};