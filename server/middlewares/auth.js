const { decodeJWT } = require('../utils/jwt');
const { ErrorHandler, handleError } = require('../utils/error');
const db = require('../db');

const auth = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            throw new ErrorHandler(400, '"Authorization" header is not provided');
        }

        const token = req.header('Authorization').replace('Bearer ', '');

        const { id } = decodeJWT(token);

        const user = await db.getUserById(id);

        if (!user) {
            throw new ErrorHandler(404, "The json web token invalid. Probably the user already deleted.");
        };

        req.user = user;
        next();
    } catch (err) {
        // if err is not handled by ErrorHandler and about jwt
        if (err.name = "JsonWebTokenError" && !err.statusCode) {
            return handleError(new ErrorHandler(400, 'Invalid json web token. Please login again.'), res);
        };
        handleError(err, res);
    }
};

module.exports = auth;