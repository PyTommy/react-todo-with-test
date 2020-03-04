const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db');
const auth = require('../middlewares/auth');
const { ErrorHandler } = require('../utils/error');
const { generateJWT } = require('../utils/jwt');

const router = express.Router();

// @ route     GET /api/user  
// @ desc      Get user with json web token.
// @ access    private
// @ res       { user: { id, username, email } }
router.get('/', auth, (req, res, next) => {
    delete req.user.password;
    res.send({ user: req.user });
});

// @ route     POST /api/user/signup   
// @ desc      Signup user
// @ access    public
// @ res       { token, user: { id, username, email } }
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

        const id = await db.insertUser({ username, email, password, id: req.body.id }); // id provided for only test;

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

// @ route     POST /api/user/login   
// @ desc      Login user
// @ access    public
// @ res       { token, user: {id, username, email} }
router.post('/login', [
    check('email', 'Please enter valid email').trim().isEmail(),
    check('password', 'Please enter password with 6 or more characters').trim().isLength({ min: 6 })
], async (req, res, next) => {
    try {
        // Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, errors.array().map(error => error.msg));
        }

        const { email, password } = req.body;

        // Get user
        const user = await db.getUserByEmail(email);
        if (!user) {
            throw new ErrorHandler(400, "Invalid email or password.");
        };

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ErrorHandler(400, "Invalid email or password.");
        };

        const token = generateJWT(user.id);

        delete user.password;

        res.status(200).json({
            token,
            user
        });
    } catch (err) {
        next(err);
    }
});


// @ route     DELETE /api/user   
// @ desc      Delete user
// @ access    private
// @ res       undefined
router.delete('/', auth, async (req, res, next) => {
    try {
        await db.deleteUser(req.user.id);

        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;