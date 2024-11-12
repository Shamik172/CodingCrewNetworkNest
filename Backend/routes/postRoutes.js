const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const isAuth = require('../middleware/isAuth');
const {upload} = require('../middleware/multerMiddleware'); 

router.post('/createPost', isAuth, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 }  
  ]), postController.postCreatePost);

router.get('/getAllPosts', postController.getAllPosts);

router.get('/getUserPosts/:username', postController.getUserPosts);

router.get('/like/:postId', isAuth, postController.likePost);

router.get('/getComments/:postId', postController.getComments);

router.post('/comment/:postId', isAuth, postController.postComment);

router.delete('/:postId/comment/:commentId', isAuth, postController.postDeleteComment);



// remaining share features

module.exports = router;