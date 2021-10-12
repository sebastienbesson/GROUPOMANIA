const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());


/*app.post('/api/user', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'essai app post'
    });
});*/

app.use('/api/auth', userRoutes);

module.exports = app;