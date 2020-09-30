// eslint-disable-next-line import/no-extraneous-dependencies
// const morgan = require('morgan');
// const express = require('express');
// const path = require('path');

// const app = express();

// app.use(morgan('dev'));
// app.use(express.static(path.resolve(__dirname, './src')));
// console.log(path.resolve(__dirname, 'src'))
// // app.use('/scripts', express.static(`${__dirname}/node_modules/handlebars/dist/`));

// app.all('/', (req, res) => {
//     res.sendFile(`${__dirname}/index.html`);
// });

const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const ip = require('ip');

const app = express();
const publicFolder = path.resolve(__dirname, 'src');

app.use(morgan('dev'));
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    // console.log("Server working at:
    // http://${ip.address()}:${PORT}
    // http://localhost:${PORT});
});

// app.listen(8080);