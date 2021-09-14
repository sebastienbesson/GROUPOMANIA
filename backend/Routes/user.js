const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user');

router.post('./signup', userCtrl.signup);

module.exports = router; 

