//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

//require('dotenv').config();

//const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log('test');
  res.status(201).json({
      message: 'essai route user'
  });

};

