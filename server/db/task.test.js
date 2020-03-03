const pool = require('./pool');
const { deleteUser } = require('./user');
const { insertTask, updateTask, getTaskById, getTasksByDateAndUserId } = require('./task');
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

describe('getTaskById', () => {
    beforeAll(setupTasks);

    test('get task successfully', async () => {
        const result = await getTaskById(task1.id);
        expect(result).toEqual(task1);
    });

    test('Error thrown with not existing id', async () => {
        try {
            await getTaskById(task5.id);
            throw undefined;
        } catch (err) {
            expect(err.message).toBe('The task not found!!');
        }
    })
});

describe('getTasksByDateAndUserId', () => {
    beforeAll(setupTasks);

    test('get task successfully', async () => {
        const tasks = await getTasksByDateAndUserId(task1.date, task1.userId);
        expect(tasks.length).toBe(2);
    });

    test('Returns empty array when there are no tasks', async () => {
        const tasks = await getTasksByDateAndUserId(new Date(1999, 0, 1), task1.userId);
        expect(tasks).toEqual([]);
    })
});

describe('updateTask', () => {
    beforeEach(setupTasks);

    const defaultUpdatedTask = {
        title: 'updated',
        date: new Date(2020, 0, 1),
        completed: true,
        userId: user1.id,
    };

    test('update task successfully', async () => {
        try {
            const updatedTask = { ...defaultUpdatedTask, id: task1.id };
            await updateTask(updatedTask);
            const fetchedTask = await getTaskById(updatedTask.id);
            expect(fetchedTask).toEqual(updatedTask);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('Throw error if user not exist', async () => {
        try {
            const updatedTask = { ...defaultUpdatedTask, id: task5.id };
            await updateTask(updatedTask);

            throw undefined; // Should not executed
        } catch (err) {
            expect(err.message).toBe("No task updated!! Check the task id.");
        }
    });
});
