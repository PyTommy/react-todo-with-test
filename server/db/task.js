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

module.exports = {
    insertTask,
};