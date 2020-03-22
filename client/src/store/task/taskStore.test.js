import moxios from 'moxios';
import axiosInstance from '../../axiosInstance';

import { createTask } from './taskActions';
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
                { ...taskU1D1Cf, id: resTaskId },
                ...initialState.task[taskU1D1Cf.date.toISOString()]
            ]
        };

        expect(storedTask).toEqual(expectedState);
    });
});

