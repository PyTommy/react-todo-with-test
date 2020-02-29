const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('From server!!');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});