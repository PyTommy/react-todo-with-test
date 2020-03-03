const pool = require('./pool');


/**
 * Insert task on database
 * @param {Object} task
 * @example 
 * insertTask({
 *  title: 'task1',
 *  date: new Date(2020, 0, 1),
 *  completed: false,
 *  userId: 1,
 *  id: 1 (for testing)
 * });
 * @returns {number} id - created id
 */
const insertTask = (taskObj) => {
    const { title, date, completed, userId, id = null } = taskObj;

    return new Promise((resolve, reject) => {
        pool.query(
            `
                INSERT INTO tasks (title, date, completed, userId ${id ? ", id" : ""}) 
                VALUES (?, ?, ?, ? ${id ? ", " + id : ""})
            `,
            [
                title,
                date,
                completed,
                userId
            ],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }

                const taskId = result.insertId;

                resolve(taskId);
            }
        );
    });
};

const getTaskById = (taskId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT 
                    id, 
                    title,  
                    date,
                    completed,
                    userId
                FROM tasks
                WHERE id = ?
            `,
            [taskId],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const task = result[0];

                if (!task) {
                    reject(new Error('The task not found!!'));
                    return;
                }

                task.completed = !!task.completed;

                resolve(task);
            }
        );
    });
};

/**
 * Get tasks by date (and userId)
 * @param {date} date 
 * @param {number} userId 
 */
const getTasksByDateAndUserId = (date, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT 
                    id, 
                    title,  
                    date,
                    completed,
                    userId
                FROM tasks
                WHERE 
                    date = ?
                    AND userId = ?
            `,
            [date, userId],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const tasks = result;

                tasks.forEach(task => {
                    task.completed = !!task.completed;
                });

                resolve(tasks);
            }
        );
    });
};

const updateTask = (taskObj) => {
    const { title, date, completed, userId, id } = taskObj;

    return new Promise((resolve, reject) => {
        pool.query(
            `
                UPDATE tasks 
                SET 
                    title=?,
                    date=?,
                    completed=?,
                    userId=? 
                WHERE id = ?
            `,
            [
                title,
                date,
                completed,
                userId,
                id
            ],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const affectedRows = result.affectedRows;
                if (affectedRows === 0) {
                    reject(new Error("No task updated!! Check the task id."));
                    return;
                }

                resolve();
            }
        );
    });
};

module.exports = {
    insertTask,
    updateTask,
    getTaskById,
    getTasksByDateAndUserId
};