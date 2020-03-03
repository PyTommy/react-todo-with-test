const express = require('express');
const path = require('path');

const db = require('./db');

const app = express();

app.get('/api/', (req, res) => {
    res.send('From server!!');
});

db.insertUser('hiroki', 'email', 'This is password');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});