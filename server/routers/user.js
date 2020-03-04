const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db');
const { ErrorHandler } = require('../utils/error');
const { generateJWT } = require('../utils/jwt');

const router = express.Router();

// @ route     GET /api/signup   
// @ desc      Signup user
// @ access    public
// @ res       { token }
router.post('/signup', [
    check('username', 'Please enter username with 3-30 letters').trim().isLength({ min: 3, max: 30 }),
    check('email', 'Please enter valid email').trim().isEmail(),
    check('password', 'Please enter password with 6 or more characters').trim().isLength({ min: 6 })
], async (req, res, next) => {
    try {
        // Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, errors.array().map(error => error.msg));
        }

        let { username, email, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const id = await db.insertUser({ username, email, password });

        const token = generateJWT(id);

        res.status(201).json({
            token,
            user: {
                id,
                username,
                email
            }
        });
    } catch (err) {
        // Handling error of duplicating email.
        if (err.message.includes('ER_DUP_ENTRY')) {
            next(new ErrorHandler(400, "The email already used!!"));
        }
        next(err);
    }
});

module.exports = router;