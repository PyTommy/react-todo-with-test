const pool = require('../db/pool');

/**
 * Create multiple users
 * @param {string} users - [{username, email, password, id}]
 */
const insertUsers = (usersArray) => {
    return new Promise((resolve, reject) => {
        const values = [];
        usersArray.forEach((user) => {
            const userArray = [
                user.username,
                user.email,
                user.password,
                +user.id
            ];
            values.push(userArray);
        });

        pool.query(
            `
                INSERT INTO users (username, email, password, id) 
                VALUES ?
            `,
            [values],
            (err, result, fields) => {
                if (err) {
                    throw new Error('insertUsers in testUtils.js failed: ' + err);
                }
                resolve();
            }
        );
    });
};


/**
 * Delete all users.
 */
const deleteAllUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
            DELETE FROM users
            `,
            [],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            }
        );
    });
};

module.exports = {
    insertUsers,
    deleteAllUsers,
};