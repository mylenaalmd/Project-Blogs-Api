const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const authentication = async (email, password) => {
    try {
        const user = await User.findOne({
            where: { email, password },
            attributes: { exclude: ['password'] },
        });
        
        const token = generateToken(user.dataValues);
        console.log(token, 'token');

        return { type: 200, message: { token } };
    } catch (e) {
    return e;
    }
};

module.exports = {
    authentication,
};