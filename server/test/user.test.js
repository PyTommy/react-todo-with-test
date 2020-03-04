const request = require('supertest');

const app = require('../app');
const { user1, user2, user3 } = require('./fixtures');
const { deleteAllUsers, insertUsers } = require('./utils');
const { decodeJWT } = require('../utils/jwt');
const { getUserById } = require('../db');

const setupUsers = async () => {
    await deleteAllUsers();
    await insertUsers([user1, user2]);
};

describe('POST /api/user/signup', () => {
    beforeEach(setupUsers);

    const path = '/api/user/signup';

    test('Successfully signup a user', async () => {
        const res = await request(app)
            .post(path)
            .send({
                username: user3.username,
                email: user3.email,
                password: user3.password,
            })
            .expect(201);

        const { token, user = {} } = res.body;

        // Check 
        expect(user.username).toBe(user3.username);
        expect(user.email).toBe(user3.email);
        expect(user.id).not.toBeUndefined();

        // Check if token exists
        expect(token).toEqual(expect.anything());

        // Check if password hashed
        const fetchedUser = await getUserById(user.id);
        expect(fetchedUser.username).toBe(user3.username);
        expect(fetchedUser.password).not.toBe(user3.password);
    });

    test('Fail to signup with duplicated email', async () => {
        const res = await request(app)
            .post(path)
            .send(user1)
            .expect(400);

        expect(res.body.message)
            .toBe('The email already used!!');
    });

    test('Fail to signup with invalid inputs', async () => {
        const res = await request(app)
            .post('/api/user/signup')
            .send({
                username: "",
                email: "invalidEmail",
                password: "12345",
            })
            .expect(400);

        expect(res.body.message.length).toBe(3);
    });
});