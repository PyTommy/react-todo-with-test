import ErrorHandler from './error';

export default class TaskClass {
    constructor(inputs) {
        const { id, title, completed, date, userId } = inputs;

        // Validation
        const errors = [];
        const validProps = ['title', 'date', 'completed', 'id', 'userId'];
        Object.keys(inputs).forEach(key => {
            const isValidKey = validProps.includes(key);
            if (!isValidKey) {
                errors.push(`"${key}" is not allowed as arg for class Task.`);
            };
        });
        if (title && !(typeof title === "string" && title.length <= 30 && title.length > 0)) {
            errors.push('Title should be 1-50 characters.');
        }
        if (date && !Date.parse(date)) {
            errors.push('Date should be valid date');
        }
        if (completed !== undefined && typeof completed !== 'boolean') {
            errors.push('completed should be boolean.');
        }
        if (typeof id !== 'number') {
            errors.push('id should be a number');
        }
        if (typeof userId !== 'number') {
            errors.push('userId should be a number');
        }
        if (errors.length > 0) {
            throw new ErrorHandler(errors);
        };

        // Set properties
        this.id = id;
        this.title = title;
        this.date = typeof date === 'string' ? new Date(date) : date;
        this.completed = completed;
        this.userId = userId;
    }
}