const { deleteUser } = require('./user');
const { insertTask, updateTask, getTaskById, getTasksByDateAndUserId, getTasksByLimitAndUserId, deleteTask } = require('./task');
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

    test('Task is undefined if not found', async () => {
        const task = await getTaskById(task5.id);
        expect(task).toBeUndefined();
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

describe('getTasksByLimitAndUserId', () => {
    const newTask1 = { ...task1 }, newTask2 = { ...task2 }, newTask3 = { ...task3 }, newTask4 = { ...task4 };
    newTask1.date = new Date(2020, 0, 1); // older
    newTask2.date = new Date(2020, 0, 2);
    newTask3.date = new Date(2020, 0, 3);
    newTask4.date = new Date(2020, 0, 4); // newer

    beforeEach(async () => {
        await deleteAllTasks();
        await insertTasks([newTask3, newTask1, newTask2, newTask4]);
    });

    test('params, offset and number, works as expected', async () => {
        const tasks = await getTasksByLimitAndUserId(1, 1, user1.id);
        expect(tasks).toEqual([newTask3]);
    });

    test('Returns sorted tasks(newer to older)', async () => {
        const tasks = await getTasksByLimitAndUserId(0, 100, user1.id);
        expect(tasks).toEqual([
            newTask4,
            newTask3,
            newTask2,
            newTask1,
        ]);
    });

    test('Returns empty array if not exist', async () => {
        const tasks = await getTasksByLimitAndUserId(0, 100, user2.id);
        expect(tasks).toEqual([]);
    });
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

            const affectedRows = await updateTask(updatedTask);
            expect(affectedRows).toBe(1);

            const fetchedTask = await getTaskById(updatedTask.id);
            expect(fetchedTask).toEqual(updatedTask);
        } catch (err) {
            expect(err).toBeUndefined(); // Should Not executed
        }
    });

    test('No task updated with not existing id', async () => {
        const updatedTask = { ...defaultUpdatedTask, id: task5.id };
        const affectedRows = await updateTask(updatedTask);

        expect(affectedRows).toBe(0);
    });
});

describe('deleteTask', () => {
    beforeEach(setupTasks);

    test('Delete a task without error', async () => {
        const affectedRows = await deleteTask(task1.id);
        expect(affectedRows).toBe(1);
    });

    test('No deleted task with not existing task', async () => {
        const affectedRows = await deleteTask(task5.id);
        expect(affectedRows).toBe(0);
    });
});

test('`deleteUser` delete tasks belong to the user, too', async () => {
    await setupUsers();
    await setupTasks();

    await deleteUser(task1.userId);
    const tasks = await getTasksByDateAndUserId(task1.date, task1.userId);

    expect(tasks).toEqual([]);
});
