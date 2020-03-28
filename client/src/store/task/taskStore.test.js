import moxios from 'moxios';
import axiosInstance from '../../axiosInstance';

import { createTask, deleteTask, toggleCompleted } from './taskActions';
import { storeFactory } from '../../../test/testUtils';
import {
    user1, user2,
    taskU1D1Cf, taskU1D1Ct, taskU1D2Cf,
} from '../../../test/fixtures';

describe('createTask action creator', () => {
    const resTaskId = 99;

    beforeEach(function () {
        moxios.install(axiosInstance);

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { id: resTaskId },
            });
        });
    });

    afterEach(function () {
        moxios.uninstall();
    });

    test('create a task first time', async () => {
        const store = storeFactory({ user: user1 });

        const newTask = {
            title: taskU1D1Cf.title,
            date: taskU1D1Cf.date
        };

        await store.dispatch(createTask(newTask));

        const expectedState = {
            [taskU1D1Cf.date.toISOString()]: [{
                ...taskU1D1Cf,
                id: resTaskId
            }]
        };

        const storedTask = store.getState().task;
        expect(storedTask).toEqual(expectedState);
    });

    test('create a task when some tasks already exist on task state', async () => {
        const initialState = {
            user: user1,
            task: {
                [taskU1D1Ct.date.toISOString()]: [taskU1D1Ct],
                [taskU1D2Cf.date.toISOString()]: [taskU1D2Cf]
            }
        };

        const store = storeFactory(initialState);

        const newTask = {
            title: taskU1D1Cf.title,
            date: taskU1D1Cf.date
        };

        await store.dispatch(createTask(newTask));
        const storedTask = store.getState().task;


        const expectedState = {
            ...initialState.task,
            [taskU1D1Cf.date.toISOString()]: [
                ...initialState.task[taskU1D1Cf.date.toISOString()],
                { ...taskU1D1Cf, id: resTaskId },
            ]
        };

        expect(storedTask).toEqual(expectedState);
    });
});

describe('deleteTask action creator', () => {

    beforeEach(function () {
        moxios.install(axiosInstance);
    });

    afterEach(function () {
        moxios.uninstall();
    });

    test('successfully delete a task', async () => {
        // Set moxios
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 204,
                response: undefined,
            });
        });

        // set store
        const store = storeFactory({
            task: {
                [taskU1D1Ct.date.toISOString()]: [taskU1D1Ct, taskU1D1Cf],
                [taskU1D2Cf.date.toISOString()]: [taskU1D2Cf]
            }
        });

        // Dispatch deleteTask
        await store.dispatch(deleteTask(taskU1D1Ct));

        // Defined expected State
        const expectedState = {
            [taskU1D1Ct.date.toISOString()]: [taskU1D1Cf],
            [taskU1D2Cf.date.toISOString()]: [taskU1D2Cf]
        };

        // Get and check store
        const storedTask = await store.getState().task;
        expect(storedTask).toEqual(expectedState);
    });

    test('does not update redux store if request fail', async () => {
        // Set moxios
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: undefined,
            });
        });

        const dummyTaskStore = {
            [taskU1D1Ct.date.toISOString()]: [taskU1D1Ct, taskU1D1Cf],
            [taskU1D2Cf.date.toISOString()]: [taskU1D2Cf]
        };

        // set store
        const store = storeFactory({ task: dummyTaskStore });

        try {
            // Dispatch deleteTask
            await store.dispatch(deleteTask(taskU1D1Ct));
            throw new Error("This line should not be executed");
        } catch (err) {
            // Get and check store
            const storedTask = await store.getState().task;
            expect(storedTask).toEqual(dummyTaskStore);
        }

    });
});

describe('toggleCompleted action creator', () => {

    beforeEach(function () {
        moxios.install(axiosInstance);
    });

    afterEach(function () {
        moxios.uninstall();
    });

    test('successfully toggle completed state', async () => {
        // Set moxios
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: undefined,
            });
        });

        // set store
        const store = storeFactory({
            task: {
                [taskU1D1Ct.date.toISOString()]: [taskU1D1Ct, taskU1D1Cf],
            }
        });

        // Dispatch deleteTask
        await store.dispatch(toggleCompleted(taskU1D1Ct));

        // Defined expected State
        const expectedState = {
            [taskU1D1Ct.date.toISOString()]: [
                {
                    ...taskU1D1Ct,
                    completed: !taskU1D1Ct.completed
                },
                taskU1D1Cf
            ],
        };

        // Get and check store
        const storedTask = await store.getState().task;
        expect(storedTask).toEqual(expectedState);
    });
});

