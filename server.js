const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));
app.use(express.static(path.resolve(__dirname, './src/assets')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(8080);
