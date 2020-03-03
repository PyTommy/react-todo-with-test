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


module.exports = {
    user1,
    user2,
    user3,
    user4,
    userEmpty,
    userLongUsername,
    userShortPassword,
    userWrongEmail,
    userWrongType
};