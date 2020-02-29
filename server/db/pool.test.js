const pool = require('./pool');

test('Connect database without error', () => {
    pool.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
        expect(err).toBeNull();
        expect(results[0].solution).toBe(2);
    });
});
