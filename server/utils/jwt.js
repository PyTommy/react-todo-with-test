const jwt = require('jsonwebtoken');

/**
 * Return json web token expires in 7 days.
 * @param {number} id - user id
 * @return {string} - Json web token 
 */
const generateJWT = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

/**
 * Returns decoded object with id property. 
 * Error thrown if provided token is not valid.
 * @param {string} token - json web token.
 * @returns {object} - decoded { id } 
 */
const decodeJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateJWT,
    decodeJWT
};