const request = require('supertest');

const app = require('../app');
const { user1, user2, user3, hashedUser1, hashedUser2, jwt1, jwt2, jwt3 } = require('./fixtures');
const { deleteAllUsers, insertUsers } = require('./utils');
const { getUserById } = require('../db');
const bcrypt = require('bcryptjs');

const setupUsers = async () => {
    await deleteAllUsers();
    await insertUsers([hashedUser1, hashedUser2]);
};

describe('GET /api/user', () => {
    beforeAll(setupUsers);
    const path = "/api/user/";

    test('Successfully return user object', async () => {
        const res = await request(app)
            .get(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .expect(200);

        expect(res.body.user).toEqual({
            id: user1.id,
            username: user1.username,
            email: user1.email,
        });
    });

    test('Fail to get user without authorization header', async () => {
        const res = await request(app)
            .get(path)
            .send()
            .expect(400);
        expect(res.body.message).toBe('"Authorization" header is not provided');
    });

    test('Fail to get user with invalid json web token', async () => {
        const res = await request(app)
            .get(path)
            .set('Authorization', `aaaaaaaaaa`)
            .send()
            .expect(400);
        expect(res.body.message).toBe("Invalid json web token. Please login again.");
    });

    test('Fail to get user with token of non existing user', async () => {
        const res = await request(app)
            .get(path)
            .set('Authorization', `Bearer ${jwt3}`)
            .send()
            .expect(404);

        expect(res.body.message).toBe("The json web token invalid. Probably the user already deleted.");
    });
});

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
    beforeAll(setupUsers);
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

describe('PUT/api/user', () => {
    beforeEach(setupUsers);
    const path = '/api/user';

    const inputs = {
        username: 'newUsername',
        email: 'newemail@test.com',
        password: 'newPassword',
    };

    test('Successfully update a user', async () => {
        const res = await request(app)
            .put(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                ...inputs,
                currentPassword: user1.password
            })
            .expect(200);

        const updatedUser1 = await getUserById(user1.id);

        // Check 
        expect(updatedUser1.id).toBe(user1.id);
        expect(updatedUser1.username).toBe(inputs.username);
        expect(updatedUser1.email).toBe(inputs.email);
        const isMatch = await bcrypt.compare(inputs.password, updatedUser1.password);
        expect(isMatch).toBe(true);
    });

    test('Fail with not valid inputs', async () => {
        const res = await request(app)
            .put('/api/user')
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                username: "",
                email: "fejiwofe",
                password: "12345",
                currentPassword: "jfeia",
            })
            .expect(400);

        expect(res.body.message.length).toBe(4);
    });


    test('Fail with wrong current password', async () => {
        const res = await request(app)
            .put(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                ...inputs,
                currentPassword: "Wrong Password"
            })
            .expect(400);

        expect(res.body.message).toBe('Provided current password is wrong.');
    });

    test('Fail with duplicated email', async () => {
        const res = await request(app)
            .put(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                ...inputs,
                email: user2.email,
                currentPassword: user1.password
            })
            .expect(400);

        expect(res.body.message)
            .toBe('The email already used!!');
    });
});

describe('DELETE/api/user', () => {
    beforeEach(setupUsers);

    test('Successfully delete a user', async () => {
        const res = await request(app)
            .delete('/api/user')
            .set('Authorization', `Bearer ${jwt1}`)
            .expect(204);
    });
});