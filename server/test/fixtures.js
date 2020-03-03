const user1 = {
    id: 10,
    username: "test1",
    email: "test1@test.com",
    password: "test1test1",
};

const user2 = {
    id: 11,
    username: "test2",
    email: "test2@test.com",
    password: "test2test2",
};

const user3 = {
    id: 12,
    username: "test3",
    email: "test3@test.com",
    password: "test3test3",
};
const user4 = {
    id: 12,
    username: "test4",
    email: "test4@test.com",
    password: "test4test4",
};



const userEmpty = {
    username: "",
    email: "",
    password: "",
};
const userWrongType = {
    id: 22,
    username: 1,
    email: 1,
    password: 1
};
const userWrongEmail = {
    id: 23,
    username: "satoshi",
    email: "satoshi",
    password: "abcdefg"
};
const userLongUsername = {
    id: 24,
    username: '1234567890123456789012345678901234567890', // max = 30
    email: 'test24@test.com',
    password: 'teat24test24',
};
const userShortPassword = {
    id: 25,
    username: 'test25',
    email: 'test25@test.com',
    password: 'test',
};

/**
 * @param {number} id - 1 
 * @param {string} title - 'task1' 
 * @param {boolean} completed - false 
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user1.id 
 */
const task1 = {
    id: 1,
    title: 'task1',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user1.id
};

/**
 * @param {number} id - 2
 * @param {string} title - 'task2'
 * @param {boolean} completed - true
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user1.id
 */
const task2 = {
    id: 2,
    title: 'task2',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user1.id,
};


/**
 * @param {number} id - 3
 * @param {string} title - 'task3'
 * @param {boolean} completed - false
 * @param {date} date -  new Date(2020, 11, 23)
 * @param {number} userId - user1.id
 */
const task3 = {
    id: 3,
    title: 'task3',
    completed: false,
    date: new Date(2020, 11, 23),
    userId: user1.id,
};

/**
 * @param {number} id - 4
 * @param {string} title - 'task4'
 * @param {boolean} completed - true
 * @param {date} date -  new Date(2020, 11, 23)
 * @param {number} userId - user1.id
 */
const task4 = {
    id: 4,
    title: 'task4',
    completed: true,
    date: new Date(2020, 11, 23),
    userId: user1.id,
};

/**
 * @param {number} id - 5 
 * @param {string} title - 'task5' 
 * @param {boolean} completed - false 
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user5.id 
 */
const task5 = {
    id: 5,
    title: 'task5',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user1.id
};
/**
 * @param {number} id - 6 
 * @param {string} title - 'task6' 
 * @param {boolean} completed - true 
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user6.id 
 */
const task6 = {
    id: 6,
    title: 'task6',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user1.id
};


/**
 * @param {number} id - 7
 * @param {string} title - 'task7'
 * @param {boolean} completed - false
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user2.id
 */
const task7 = {
    id: 7,
    title: 'task7',
    completed: false,
    date: new Date(2020, 11, 24),
    userId: user2.id,
};

/**
 * @param {number} id - 8
 * @param {string} title - 'task8'
 * @param {boolean} completed - true
 * @param {date} date -  new Date(2020, 11, 24)
 * @param {number} userId - user2.id
 */
const task8 = {
    id: 8,
    title: 'task8',
    completed: true,
    date: new Date(2020, 11, 24),
    userId: user2.id,
};

/**
 * @param {number} id - 9
 * @param {string} title - 'task9'
 * @param {boolean} completed - false
 * @param {date} date -  new Date(2020, 11, 23)
 * @param {number} userId - user2.id
 */
const task9 = {
    id: 9,
    title: 'task9',
    completed: false,
    date: new Date(2020, 11, 23),
    userId: user2.id,
};

/**
 * @param {number} id - 10
 * @param {string} title - 'task10'
 * @param {boolean} completed - true
 * @param {date} date -  new Date(2020, 11, 23)
 * @param {number} userId - user1.id
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
    userEmpty,
    userLongUsername,
    userShortPassword,
    userWrongEmail,
    userWrongType,

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