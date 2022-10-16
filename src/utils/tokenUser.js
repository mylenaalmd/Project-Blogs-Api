require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token, 'token');
  
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const decoded = jwt.verify(token, secret);
    req.id = decoded.data.id;
    req.userName = decoded.data.name;
    req.userEmail = decoded.data.email;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};