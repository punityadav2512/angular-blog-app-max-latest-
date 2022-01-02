const express = require('express');



const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const postsController = require('../controllers/posts');


const router = express.Router();



router.get('/', postsController.getPosts);

router.get('/:id', postsController.getPost)


router.post('/', checkAuth, extractFile, postsController.createPost);

router.put('/:id', checkAuth, extractFile, postsController.updatePosts)


router.delete('/:id', checkAuth, postsController.deletePost)

module.exports = router;