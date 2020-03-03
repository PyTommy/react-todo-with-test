const pool = require('./pool');


/**
 * Insert task on database
 * @param {Object} task
 * @example 
 * insertTask({
 *  title: 'task1',
 *  date: new Date(2020, 0, 1),
 *  completed: false,
 *  userId: 1
 * });
 * @returns {number} id - created id
 */
const insertTask = (taskObj) => {
    const { taskname, email, password, id = null } = taskObj;

    return new Promise((resolve, reject) => {
        pool.query(
            `
                INSERT INTO tasks (taskname, email, password ${id ? ", id" : ""}) 
                VALUES (?, ?, ? ${id ? ", " + id : ""})
            `,
            [
                taskname,
                email,
                password,
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