const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);


module.exports = router; 

