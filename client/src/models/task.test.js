import TaskModel from './task';
import * as dummy from '../../test/fixtures';

describe('TaskModel', () => {
    test('create object', () => {
        const createdTask = new TaskModel(dummy.taskU1D1Cf);
        expect(createdTask).toEqual(dummy.taskU1D1Cf);
    });

    test('create object with iso date', () => {
        const createdTask = new TaskModel({
            ...dummy.taskU1D1Cf,
            date: dummy.taskU1D1Cf.date.toISOString()
        });
        expect(createdTask).toEqual(dummy.taskU1D1Cf);
    });

    test('throw error with invalid arg props', () => {
        try {
            new TaskModel({
                ...dummy.taskU1D1Cf,
                invalidProp: 'invalid',
                invalidProp2: 'invalid2'
            });
        } catch (err) {
            expect(err.message.length).toBe(2);
        }
    });

    test('throw error with invalid arg prop types', () => {
        try {
            new TaskModel({
                id: 'string',
                title: 1,
                completed: 1,
                date: 'a',
                userId: "string"
            });
        } catch (err) {
            expect(err.message.length).toBe(5);
        }
    });
});