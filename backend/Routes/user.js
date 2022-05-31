const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getUser);
router.put('/user/:id', auth, multer, userCtrl.modifyUser);  
router.patch('/user/:id', auth, userCtrl.modifyPassword);
router.delete('/user/:id', auth, userCtrl.deleteUser);

module.exports = router; 

