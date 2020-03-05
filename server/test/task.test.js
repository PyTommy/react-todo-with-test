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

describe('PUT/api/task', () => {
    beforeEach(setupTasks);
    const path = '/api/task';

    const body = {
        id: task1.id,
        title: 'updated',
        date: new Date(1999, 0, 1),
        completed: !task1.completed,
    };

    test('Successfully update a task', async () => {
        const res = await request(app)
            .patch(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send(body)
            .expect(200);

        const updatedTask = await db.getTaskById(body.id);

        expect(updatedTask).toEqual({
            ...task1,
            ...body,
        });
    });

    test('Update none if body property contain only id', async () => {
        const res = await request(app)
            .patch(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({ id: task1.id })
            .expect(200);

        const updatedTask = await db.getTaskById(body.id);
        expect(updatedTask).toEqual(task1);
    });

    test('Fail with invalid inputs', async () => {
        const res = await request(app)
            .patch(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({
                title: 1,
                date: 'not real date',
                id: 'fae',
                completed: 'fawe',
                userId: task1.userId
            })
            .expect(400);
        expect(res.body.message.length).toBe(5);
    });

    test('Fail with non existing task id', async () => {
        const res = await request(app)
            .patch(path)
            .set('Authorization', `Bearer ${jwt1}`)
            .send({ ...body, id: 999 })
            .expect(400);
    });

    test('Fail with invalid authentication', async () => {
        const res = await request(app)
            .patch(path)
            .set('Authorization', `Bearer ${jwt2}`)
            .send(body)
            .expect(401);
    });
});