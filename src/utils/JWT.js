const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

module.exports = {
    generateToken,
};