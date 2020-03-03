const dbUser = require('./dbUser');
const { user1, user2, user3, user4 } = require('../test/fixtures');
const { insertUsers, deleteAllUsers } = require('../test/utils');

const setup = async () => {
    await deleteAllUsers();
    await insertUsers([user1, user2]);
};


describe('insertUser', () => {
    beforeEach(setup);

    test('Insert a user without error', async () => {
        try {
            const result = await dbUser.insertUser(
                user3.username,
                user3.email,
                user3.password,
                user3.id,
            );

            expect(result).toBe(user3.id);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('Insert a user auto increment id and return it', async () => {
        try {
            const result1 = await dbUser.insertUser(
                user3.username,
                user3.email,
                user3.password,
            );
            const result2 = await dbUser.insertUser(
                user4.username,
                user4.email,
                user4.password,
            );
            expect(result2).toBeGreaterThan(result1);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('Fail to insert a user with duplicated email', async () => {
        try {
            await dbUser.insertUser(
                user1.username,
                user1.email,
                user1.password,
                user1.id,
            );

            expect('dbUser.insert should fail!!').toBe(null);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
});

describe('getUserById', () => {
    beforeAll(setup);

    test('get user successfully', async () => {
        try {
            const result = await dbUser.getUserById(user1.id);
            expect(result).toEqual(user1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('get with none existing id returns undefined', async () => {
        try {
            const result = await dbUser.getUserById(user3.id);
            expect(result).toBeUndefined();
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    })
});

describe('getUserByEmail', () => {
    beforeAll(setup);

    test('get user successfully', async () => {
        try {
            const result = await dbUser.getUserByEmail(user1.email);
            expect(result).toEqual(user1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Not found with none existing user id', async () => {
        try {
            const result = await dbUser.getUserByEmail(user3.email);
            expect(result).toBeUndefined();
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    })
});

