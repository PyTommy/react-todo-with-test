import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import useTaskForm from './useTaskForm';
import generateToday from '../utils/generateToday';
import * as taskActions from '../store/task/taskActions';


let result;
const mockCreateTaskReturnValue = "mockCreateTask called";
const mockEditTaskReturnValue = "mockEditTask called";
const mockCreateTask = jest.fn().mockReturnValue(mockCreateTaskReturnValue);
const mockEditTask = jest.fn().mockReturnValue(mockEditTaskReturnValue);
const mockDispatch = jest.fn();


// mock modules
taskActions.createTask = mockCreateTask;
taskActions.editTask = mockEditTask;
// jest.mock('react-redux', () => ({
//     useDispatch: (arg) => mockDispatch(arg)
// }));
reactRedux.useDispatch = () => mockDispatch;


const setup = (initialDate, initialTitle, completed, id) => {
    mockCreateTask.mockClear();
    mockEditTask.mockClear();
    mockDispatch.mockClear();
    const obj = renderHook(() => useTaskForm(initialDate, initialTitle, completed, id));
    result = obj.result;
};

describe('New task form', () => {
    beforeEach(() => {
        setup();
    });

    test('Returns title successfully', () => {
        const expectedTitle = {
            value: "",
            isValid: false,
        };
        expect(result.current.title).toEqual(expectedTitle);
    });

    test('Returns date successfully', () => {
        const expectedDate = {
            value: generateToday(),
            isValid: true
        };
        expect(result.current.date).toEqual(expectedDate);
    });


    test('change title', () => {
        act(() => {
            result.current.change('title', "something", true);
        });

        const expectedTitle = {
            value: "something",
            isValid: true
        };

        expect(result.current.title).toEqual(expectedTitle);
    });


    test('change date', () => {
        const yesterday = new Date(generateToday().getTime() - 24 * 60 * 60 * 1000);

        act(() => {
            result.current.change('date', yesterday, true);
        });

        const expectedDate = {
            value: yesterday,
            isValid: true
        };

        expect(result.current.date).toEqual(expectedDate);
    });

    test('Validity', () => {
        expect(result.current.validity).toBe(false);

        act(() => {
            result.current.change('title', "something", true);
        });

        expect(result.current.validity).toBe(true);
    });

    test('submit() calls `createTask` action creator', () => {
        // Change title to assign validity = true;
        act(() => {
            result.current.change('title', "something", true);
        });

        act(() => {
            result.current.submit();
        });

        const expectedCreateTaskArgs = {
            title: "something",
            date: generateToday()
        };

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(mockCreateTaskReturnValue);
        expect(mockCreateTask).toHaveBeenCalledTimes(1);
        expect(mockCreateTask).toHaveBeenCalledWith(expectedCreateTaskArgs)
    });
});

describe('Edit task form', () => {
    const editingTask = {
        title: "Study programming",
        date: new Date(2020, 0, 2),
        completed: true,
        id: 98
    };

    beforeEach(() => {
        setup(editingTask.date, editingTask.title, editingTask.completed, editingTask.id);
    });

    test('Returns title successfully', () => {
        const expectedTitle = {
            value: editingTask.title,
            isValid: true,
        };
        expect(result.current.title).toEqual(expectedTitle);
    });

    test('Returns date successfully', () => {
        const expectedDate = {
            value: editingTask.date,
            isValid: true
        };
        expect(result.current.date).toEqual(expectedDate);
    });


    test('change title', () => {
        act(() => {
            result.current.change('title', "something", false);
        });

        const expectedTitle = {
            value: "something",
            isValid: false
        };

        expect(result.current.title).toEqual(expectedTitle);
    });


    test('change date', () => {
        const yesterday = new Date(generateToday().getTime() - 24 * 60 * 60 * 1000);

        act(() => {
            result.current.change('date', yesterday, true);
        });

        const expectedDate = {
            value: yesterday,
            isValid: true
        };

        expect(result.current.date).toEqual(expectedDate);
    });

    test('Validity', () => {
        expect(result.current.validity).toBe(true);

        act(() => {
            result.current.change('title', "", false);
        });

        expect(result.current.validity).toBe(false);
    });

    test('submit() calls `editTask` action creator', () => {
        act(() => {
            result.current.submit();
        });

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(mockEditTaskReturnValue);
        expect(mockEditTask).toHaveBeenCalledTimes(1);
        expect(mockEditTask).toHaveBeenCalledWith(editingTask);
    });
});

