const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db');
const auth = require('../middlewares/auth');
const { ErrorHandler } = require('../utils/error');

const router = express.Router();

// @ route     POST /api/task  
// @ desc      Create a task
// @ access    private
// @ res       { id }
router.post('/', [
    check('title').trim().isLength({ min: 1, max: 50 }),
    check('date').isISO8601(),
    auth
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, errors.array().map(error => error.msg));
        }

        let { title, date, id } = req.body; // id is only for testing;

        date = new Date(date); // ISO => Date object

        const newTaskId = await db.insertTask({
            id,
            title,
            date,
            completed: false,
            userId: req.user.id,
        });

        res.status(201).send({ id: newTaskId });
    } catch (err) {
        next(err);
    }
});

module.exports = router;