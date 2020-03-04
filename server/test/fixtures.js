const { generateJWT } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

const hashPassword = (plainPassword) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
};

const user1 = {
    id: 10,
    username: "test1",
    email: "test1@test.com",
    password: "test1test1",
};
const hashedUser1 = {
    ...user1,
    password: hashPassword(user1.password),
};
const jwt1 = generateJWT(user1.id);

const user2 = {
    id: 11,
    username: "test2",
    email: "test2@test.com",
    password: "test2test2",
};
const hashedUser2 = {
    ...user2,
    password: hashPassword(user2.password),
};
const jwt2 = generateJWT(user2.id);

const user3 = {
    id: 12,
    username: "test3",
    email: "test3@test.com",
    password: "test3test3",
};
const hashedUser3 = {
    ...user3,
    password: hashPassword(user3.password),
};
const jwt3 = generateJWT(user3.id);

const user4 = {
    id: 12,
    username: "test4",
    email: "test4@test.com",
    password: "test4test4",
};
const hashedUser4 = {
    ...user4,
    password: hashPassword(user4.password),
};
const jwt4 = generateJWT(user4.id);

/**
 * @prop {number} id - 1 
 * @prop {string} title - 'task1' 
 * @prop {boolean} completed - false 
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user1.id 
 */
const task1 = {
    id: 1,
    title: 'task1',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user1.id
};

/**
 * @prop {number} id - 2
 * @prop {string} title - 'task2'
 * @prop {boolean} completed - true
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user1.id
 */
const task2 = {
    id: 2,
    title: 'task2',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user1.id,
};


/**
 * @prop {number} id - 3
 * @prop {string} title - 'task3'
 * @prop {boolean} completed - false
 * @prop {date} date -  new Date(2020, 11, 23)
 * @prop {number} userId - user1.id
 */
const task3 = {
    id: 3,
    title: 'task3',
    completed: false,
    date: new Date(2020, 11, 23),
    userId: user1.id,
};

/**
 * @prop {number} id - 4
 * @prop {string} title - 'task4'
 * @prop {boolean} completed - true
 * @prop {date} date -  new Date(2020, 11, 23)
 * @prop {number} userId - user1.id
 */
const task4 = {
    id: 4,
    title: 'task4',
    completed: true,
    date: new Date(2020, 11, 23),
    userId: user1.id,
};

/**
 * @prop {number} id - 5 
 * @prop {string} title - 'task5' 
 * @prop {boolean} completed - false 
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user5.id 
 */
const task5 = {
    id: 5,
    title: 'task5',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user1.id
};
/**
 * @prop {number} id - 6 
 * @prop {string} title - 'task6' 
 * @prop {boolean} completed - true 
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user6.id 
 */
const task6 = {
    id: 6,
    title: 'task6',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user1.id
};


/**
 * @prop {number} id - 7
 * @prop {string} title - 'task7'
 * @prop {boolean} completed - false
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user2.id
 */
const task7 = {
    id: 7,
    title: 'task7',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user2.id,
};

/**
 * @prop {number} id - 8
 * @prop {string} title - 'task8'
 * @prop {boolean} completed - true
 * @prop {date} date -  new Date(2020, 11, 24)
 * @prop {number} userId - user2.id
 */
const task8 = {
    id: 8,
    title: 'task8',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user2.id,
};

/**
 * @prop {number} id - 9
 * @prop {string} title - 'task9'
 * @prop {boolean} completed - false
 * @prop {date} date -  new Date(2020, 11, 23)
 * @prop {number} userId - user2.id
 */
const task9 = {
    id: 9,
    title: 'task9',
    completed: false,
    date: new Date(2020, 11, 23),
    userId: user2.id,
};

/**
 * @prop {number} id - 10
 * @prop {string} title - 'task10'
 * @prop {boolean} completed - true
 * @prop {date} date -  new Date(2020, 11, 23)
 * @prop {number} userId - user1.id
 */
const task10 = {
    id: 10,
    title: 'task10',
    completed: true,
    date: new Date(2020, 11, 23),
    userId: user2.id,
};

module.exports = {
    user1,
    user2,
    user3,
    user4,
    hashedUser1,
    hashedUser2,
    hashedUser3,
    hashedUser4,
    jwt1,
    jwt2,
    jwt3,
    jwt4,

    task1,
    task2,
    task3,
    task4,
    task5,
    task6,
    task7,
    task8,
    task9,
    task10,
};