const request = require('supertest');

const app = require('../app');
const { user1, user2, user3, hashedUser1, hashedUser2 } = require('./fixtures');
const { deleteAllUsers, insertUsers } = require('./utils');
const { getUserById } = require('../db');

const setupUsers = async () => {
    await deleteAllUsers();
    await insertUsers([hashedUser1, hashedUser2]);
};

describe('POST /api/user/signup', () => {
    beforeEach(setupUsers);

    const path = '/api/user/signup';

    test('Successfully signup a user', async () => {
        const res = await request(app)
            .post(path)
            .send(user3)
            .expect(201);

        const { token, user } = res.body;

        // Check 
        expect(user).toEqual({
            username: user3.username,
            id: user3.id,
            email: user3.email,
        });

        // Check if token exists
        expect(token).toEqual(expect.anything());

        // Check if password hashed
        const fetchedUser = await getUserById(user3.id);
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

describe('POST/api/user/login', () => {
    const path = "/api/user/login";

    test('Successfully login', async () => {
        const res = await request(app)
            .post(path)
            .send({
                email: user1.email,
                password: user1.password,
            })
            .expect(200);

        const { token, user } = res.body;

        expect(token).toEqual(expect.anything());
        expect(user).toEqual({
            id: user1.id,
            username: user1.username,
            email: user1.email,
        });
    });

    test('Fail with invalid input formats', async () => {
        const res = await request(app)
            .post(path)
            .send({
                email: "invalidEmail",
                password: "12345",
            })
            .expect(400);

        expect(res.body.message.length).toBe(2);
    });

    test('Fail with not existing email', async () => {
        const res = await request(app)
            .post(path)
            .send({
                email: user1.email + ".jp",
                password: user1.password,
            })
            .expect(400);
        expect(res.body.message).toBe('Invalid email or password.');
    });

    test('Fail with wrong password', async () => {
        const res = await request(app)
            .post(path)
            .send({
                email: user1.email,
                password: "wrongPassword",
            })
            .expect(400);
        expect(res.body.message).toBe('Invalid email or password.');
    });
});