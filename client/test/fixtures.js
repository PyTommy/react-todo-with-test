export const user1 = {
    id: 1,
    username: "test1",
    email: "test1@test.com",
    password: "test1test1",
};
export const user2 = {
    id: 2,
    username: "test2",
    email: "test2@test.com",
    password: "test2test2",
};

//============
// Date
//============
export const date1 = new Date(2020, 0, 2);
export const date2 = new Date(2020, 0, 3);
export const date3 = new Date(2020, 0, 4);

//============
// Tasks (U1: user1, D1: Date1, Cf: completed = false)
//============
// User1's task
export const taskU1D1Cf = {
    id: 1,
    title: 'task1',
    completed: false,
    date: date1,
    userId: user1.id,
};
export const taskU1D1Ct = {
    id: 2,
    title: 'task2',
    completed: true,
    date: date1,
    userId: user1.id,
};
export const taskU1D2Cf = {
    id: 3,
    title: 'task3',
    completed: false,
    date: date2,
    userId: user1.id,
};
export const taskU1D2Ct = {
    id: 4,
    title: 'task4',
    completed: true,
    date: date2,
    userId: user1.id,
};
export const taskU1D3Cf = {
    id: 5,
    title: 'task5',
    completed: false,
    date: date3,
    userId: user1.id,
};
export const taskU1D3Ct = {
    id: 6,
    title: 'task6',
    completed: true,
    date: date3,
    userId: user1.id,
};

// User2's task
export const taskU2D1Cf = {
    id: 7,
    title: 'task7',
    completed: false,
    date: date1,
    userId: user2.id,
};
export const taskU2D1Ct = {
    id: 8,
    title: 'task8',
    completed: true,
    date: date1,
    userId: user2.id,
};
export const taskU2D2Cf = {
    id: 9,
    title: 'task9',
    completed: false,
    date: date2,
    userId: user2.id,
};
export const taskU2D2Ct = {
    id: 10,
    title: 'task10',
    completed: true,
    date: date2,
    userId: user2.id,
};
export const taskU2D3Cf = {
    id: 11,
    title: 'task11',
    completed: false,
    date: date3,
    userId: user2.id,
};
export const taskU2D3Ct = {
    id: 12,
    title: 'task12',
    completed: true,
    date: date3,
    userId: user2.id,
};
