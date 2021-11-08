const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/posts');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
//router.get('/all/:id', postCtrl.getAllPostsForOne);
router.delete('/:id', auth, postCtrl.deleteOnePost);

module.exports = router;