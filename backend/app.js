const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./Routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post('/api/user', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'je tente sans sequelize ni mysql'
    });
});


app.use('api/user', userRoutes);


module.exports = app;