const { insertUser, getUserById, getUserByEmail, updateUser } = require('./user');
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
            const result = await insertUser(
                user3.username,
                user3.email,
                user3.password,
                user3.id,
            );

            expect(result).toBe(user3.id);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Insert a user auto increment id and return it', async () => {
        try {
            const result1 = await insertUser(
                user3.username,
                user3.email,
                user3.password,
            );
            const result2 = await insertUser(
                user4.username,
                user4.email,
                user4.password,
            );
            expect(result2).toBeGreaterThan(result1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Fail to insert a user with duplicated email', async () => {
        try {
            await insertUser(
                user1.username,
                user1.email,
                user1.password,
            );

            throw undefined; // Should Not executed
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
});

describe('getUserById', () => {
    beforeAll(setup);

    test('get user successfully', async () => {
        try {
            const result = await getUserById(user1.id);
            expect(result).toEqual(user1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('get with none existing id returns undefined', async () => {
        try {
            const result = await getUserById(user3.id);
            throw undefined;
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    })
});

describe('getUserByEmail', () => {
    beforeAll(setup);

    test('get user successfully', async () => {
        try {
            const result = await getUserByEmail(user1.email);
            expect(result).toEqual(user1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Not found with none existing user id', async () => {
        try {
            const result = await getUserByEmail(user3.email);
            throw undefined;
        } catch (err) {
            expect(err).not.toBeUndefined(); // Should Not executed
        }
    })
});


describe('updateUser', () => {
    beforeAll(setup);

    test('update user successfully', async () => {
        try {
            const result = await updateUser();

        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Throw error if user not exist', async () => {
        try {

        } catch (err) {

        }
    });

});

