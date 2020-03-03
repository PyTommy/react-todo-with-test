const pool = require('./pool');
const { insertUser, getUserById, getUserByEmail, updateUser, deleteUser } = require('./user');
const { user1, user2, user3, user4 } = require('../test/fixtures');
const { insertUsers, deleteAllUsers } = require('../test/utils');

// const setup = async () => {
//     await deleteAllUsers();
//     await insertUsers([user1, user2]);
// };

