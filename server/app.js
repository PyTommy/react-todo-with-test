const express = require('express');
const path = require('path');
const app = express();

const { handleError } = require('./utils/error');

// Setup middleware
app.use(express.json()); // parses incoming requests with JSON payloads

// Routers
app.use('/api/user', require('./routers/user'));

// Handling Error
app.use((err, req, res, next) => {
    if (err) {
        handleError(err, res);
    }
    next()
});

// GET/* serve react app 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

module.exports = app;