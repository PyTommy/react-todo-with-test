const express = require('express');
const { check, validationResult } = require('express-validator');
const moment = require('moment');

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


// @ route     PUT /api/task
// @ desc      update title, date or completed.
// @ body { title(opt), date(opt), completed(opt), id}.
// @ access    private
// @ res       undefined
router.patch('/', auth, async (req, res, next) => {
    try {
        let { title, date, completed, id } = req.body;

        // Validation
        const validationErrors = [];
        Object.keys(req.body).forEach(key => {
            const isValidKey = ['title', 'date', 'completed', 'id'].includes(key);
            if (!isValidKey) {
                validationErrors.push(`"${key}" is not allowed as body property.`);
            };
        });
        if (title && !(typeof title === "string" && title.length <= 30)) {
            validationErrors.push('Title should be 1-50 characters.');
        }
        if (date && !moment(date).isValid()) {
            validationErrors.push('Date should be valid date');
        }
        if (completed !== undefined && typeof completed !== 'boolean') {
            validationErrors.push('completed should be boolean.');
        }
        if (typeof id !== 'number') {
            validationErrors.push('id should be a number');
        }
        if (validationErrors.length > 0) {
            throw new ErrorHandler(400, validationErrors);
        };

        // Get current task from database
        const task = await db.getTaskById(id);

        // Check if enabled to update the task.
        if (!task) {
            throw new ErrorHandler(400, 'No task found.');
        }
        if (task.userId !== req.user.id) {
            throw new ErrorHandler(401, "Unauthorized for deleting the task");
        };

        // Update the task
        const updatedTask = {
            ...task,
            title: title || task.title,
            date: date ? new Date(date) : task.date,
            completed: typeof completed === 'boolean' ? completed : task.completed
        };

        await db.updateTask(updatedTask);

        res.status(200).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;