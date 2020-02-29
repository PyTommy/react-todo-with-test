const pool = require('./pool');

/**
 * Insert user on database
 * @param {string} username - CHAR(30) 
 * @param {string} email - CHAR(254)
 * @param {string} password - hashed password with CHAR(60)
 * @param {number} id - for testing.
 * @returns result - Example) {"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 4, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 0}
 */
const insertUser = (username, email, password, id = null) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                INSERT INTO users (username, email, password ${id ? ", id" : ""}) 
                VALUES (?, ?, ? ${id ? ", " + id : ""})
            `,
            [
                username,
                email,
                password,
            ],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

module.exports = {
    insertUser
};