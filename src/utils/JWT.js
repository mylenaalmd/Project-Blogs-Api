const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
    expiresIn: '15d',
    algorithm: 'HS256',
};

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

module.exports = {
    generateToken,
};