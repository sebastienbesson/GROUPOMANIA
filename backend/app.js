const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());

app.use(bodyParser.json());


/*app.post('/api/user', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'essai app post'
    });
});*/

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;