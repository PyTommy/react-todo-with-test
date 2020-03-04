const request = require('supertest');

const app = require('../app');
const {
    user1, user2, user3, jwt1, jwt2, jwt3,
    task1, task2, task3, task4, task5, task6, task7, task8, task9, task10
} = require('./fixtures');
const { deleteAllUsers, insertUsers, deleteAllTasks, insertTasks } = require('./utils');
const db = require('../db');


const setupUsers = async () => {
    await deleteAllUsers();
    await insertUsers([user1, user2]);
};

const setupTasks = async () => {
    await deleteAllTasks();
    await insertTasks([task1, task2, task3, task4, task7, task8, task9, task10]);
};

beforeAll(setupUsers);

describe('POST/api/task', () => {
    beforeEach(setupTasks);
    const path = '/api/task';

    const newTask = {
        id: 101,
        title: 'task101',
        date: new Date(2020, 11, 24),
    };

    test('Successfully create a task', async () => {
        const res = await request(app)
            .post(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send(newTask)
            .expect(201);

        expect(res.body.id).toBe(newTask.id);

        const createdTask = await db.getTaskById(newTask.id);

        expect(createdTask).toEqual({
            ...newTask,
            completed: false,
            userId: user1.id
        });
    });

    test('Fail with invalid inputs', async () => {
        const res = await request(app)
            .post(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                title: "",
                date: "not real data"
            })
            .expect(400);

        expect(res.body.message.length).toBe(2);
    });

});