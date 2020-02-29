const express = require('express');
const path = require('path');

const dbUser = require('./db/dbUser');

const app = express();

dbUser.create('tommy', 'email', 'password');

app.get('/api/', (req, res) => {
    res.send('From server!!');
});


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