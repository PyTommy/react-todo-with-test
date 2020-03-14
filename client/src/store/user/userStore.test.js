import moxios from 'moxios';
import axiosInstance from '../../axiosInstance';

import { signup } from './userAction';
import { storeFactory } from '../../../test/testUtils';
import {
    user1, user2,
} from '../../../test/fixtures';

const setupMoxios = (status, response) => {
    moxios.install(axiosInstance);
    moxios.wait(() => {
        moxios.install(axiosInstance);

        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: status,
            response: response,
        });
    });
};

afterEach(function () {
    moxios.uninstall();
});

describe('signup', () => {
    test('Signup successfully', async () => {
        const dummyUserForm = {
            username: 'Dummy',
            email: "dummy@gmail.com",
            password: "dummyPassword"
        };
        const dummyStatus = 201;
        const dummyRes = {
            token: "ThisIsDummyToken",
            user: {
                id: 123,
                ...dummyUserForm
            }
        }

        const mockLocalStorageSetItem = jest.fn();
        localStorage.setItem = mockLocalStorageSetItem;

        setupMoxios(dummyStatus, dummyRes);
        const store = storeFactory();

        await store.dispatch(signup({
            username: dummyUserForm.username,
            email: dummyUserForm.email,
            password: dummyUserForm.password
        }));

        expect(store.getState().user).toEqual(dummyRes);
    });

    test('Error thrown', async () => {
        const dummyUserForm = {
            username: 'Dummy',
            email: "dummy@gmail.com",
            password: "dummyPassword"
        };
        const dummyStatus = 400;

        setupMoxios(dummyStatus, {});
        const store = storeFactory();

        try {
            await store.dispatch(signup({
                username: dummyUserForm.username,
                email: dummyUserForm.email,
                password: dummyUserForm.password
            }));
            throw new Error("Should not be executed");
        } catch (err) {
            expect(store.getState().user).toEqual({});
            expect(err).not.toBeUndefined();
        }
    });
});