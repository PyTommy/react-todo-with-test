const { insertUser, getUserById, getUserByEmail, updateUser, deleteUser } = require('./user');
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
            const result = await insertUser(user3);

            expect(result).toBe(user3.id);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Insert a user auto increment id and return it', async () => {
        try {
            const result1 = await insertUser({
                username: user3.username,
                email: user3.email,
                password: user3.password,
            });
            const result2 = await insertUser({
                username: user4.username,
                email: user4.email,
                password: user4.password,
            });
            expect(result2).toBeGreaterThan(result1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Fail to insert a user with duplicated email', async () => {
        try {
            await insertUser({
                username: user1.username,
                email: user1.email,
                password: user1.password,
            });

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
        const result = await getUserById(user3.id);
        expect(result).toBe(undefined);
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
        const result = await getUserByEmail(user3.email);
        expect(result).toBe(undefined);
    })
});


describe('updateUser', () => {
    beforeEach(setup);

    const defaultUpdatedUser = {
        username: 'updated',
        email: 'updated@updated.com',
        password: 'updatedAndHashed',
    };

    test('update user successfully', async () => {
        try {
            const updatedUser = { ...defaultUpdatedUser, id: user1.id };
            const user = await updateUser(updatedUser);

            expect(user).toBeUndefined();
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Throw error if user not exist', async () => {
        try {
            const updatedUser = { ...defaultUpdatedUser, id: user3.id };
            await updateUser(updatedUser);

            throw undefined; // Should not executed
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
});


describe('deleteUser', () => {
    beforeEach(setup);

    test('Delete a user without error', async () => {
        try {
            await deleteUser(user1.id);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Fail to delete a user with none existing user id', async () => {
        try {
            await deleteUser(user3.id);

            throw undefined; // Should Not executed
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
});