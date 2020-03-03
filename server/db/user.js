const pool = require('./pool');

/**
 * Insert user on database
 * @param {string} username - CHAR(30) 
 * @param {string} email - CHAR(254)
 * @param {string} password - hashed password with CHAR(60)
 * @param {number} id - for testing.
 * @returns {number} id - created id
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

                const userId = result.insertId;

                resolve(userId);
            }
        );
    });
};

/**
 * Returns user object
 * @param {number} userId 
 * @returns {object|undefined} - {id, username, email, password}. Undefined if user not found.
 */
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT id, username, email, password FROM users
                WHERE id = ?
            `,
            [userId],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const user = result[0];
                resolve(user);
            }
        );
    });
};

/**
 * Returns user object
 * @param {email} email
 * @returns {object|undefined} - {id, username, email, password}. Undefined if user not found.
 */
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT id, username, email, password FROM users
                WHERE email = ?
            `,
            [email],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const user = result[0];
                resolve(user);
            }
        );
    });
};


const updateUser = () => {

}

const deleteUser = () => {

};



module.exports = {
    insertUser,
    getUserById,
    getUserByEmail
};