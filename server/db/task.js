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

/**
 * Get a task by id
 * @param {number} taskId
 * @returns {object|undefined} - undefined or a task. {id, title, date, completed, userId} 
 */
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

                if (task) {
                    task.completed = !!task.completed;
                }

                resolve(task);
            }
        );
    });
};

/**
 * Get tasks by date (and userId)
 * @param {date} date 
 * @param {number} userId 
 * @returns {object} - tasks. [{id, title, date, completed, userId}]
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

/**
 * Returns array of tasks sorted newer to older.
 * @param {number} offset 
 * @param {number} number 
 * @param {number} userId 
 * @returns {array} - tasks. [{id, title, date, completed, userId}]
 */
const getTasksByLimitAndUserId = (offset, number, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT * FROM tasks
                WHERE userId = ?
                ORDER BY date DESC
                LIMIT ?, ?
                
            `,
            [userId, offset, number],
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

/**
 * Update a task.
 * @param {object} taskObj  - {title, date, completed, userId, id}
 * @returns {number} - number of affected rows.
 */
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

                resolve(affectedRows);
            }
        );
    });
};

/**
 * Delete a task by id.
 * @param {number} id 
 * @returns {number} - number of affected rows.
 */
const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                DELETE FROM tasks WHERE id = ?
            `,
            [id],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }

                const affectedRows = result.affectedRows;
                resolve(affectedRows);
            }
        );
    });
};

module.exports = {
    insertTask,
    updateTask,
    getTaskById,
    getTasksByDateAndUserId,
    getTasksByLimitAndUserId,
    deleteTask,
};