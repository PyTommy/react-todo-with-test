const pool = require('./pool');
const { deleteUser } = require('./user');
const { insertTask } = require('./task');
const {
    user1, user2, user3,
    task1, task2, task3, task4, task5, task6, task7, task8, task9, task10
} = require('../test/fixtures');
const { insertUsers, deleteAllUsers, insertTasks, deleteAllTasks } = require('../test/utils');

const setupUsers = async () => {
    await deleteAllUsers();
    await insertUsers([user1, user2]);
};

const setupTasks = async () => {
    await deleteAllTasks();
    await insertTasks([task1, task2, task3, task4, task7, task8, task9, task10]);
};

beforeAll(setupUsers);

describe('insertTask', () => {
    beforeEach(setupTasks);

    test('Insert task without error', async () => {
        const id = await insertTask(task5);
        expect(id).toBe(task5.id);
    });

    test('Auto increment id', async () => {
        const id1 = await insertTask(task5);
        const id2 = await insertTask(task6);
        expect(id2).toBeGreaterThan(id1);
    });

});
