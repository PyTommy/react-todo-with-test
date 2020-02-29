const dbUser = require('./dbUser');
const { user1, user2, user3 } = require('../test/fixtures');
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

            expect(result.insertId).toBe(user3.id);
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
            expect(result[0]).toEqual(user1);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    // 
    test('Not found with ', async () => {
        try {
            const result = await dbUser.getUserById(user3.id);
            expect(result.length).toBe(0);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    })
});