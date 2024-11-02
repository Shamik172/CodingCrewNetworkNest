const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const isAuth = require('../middleware/isAuth');

router.post('/userPost', isAuth, postController.postCreatePost);

router.post('/:postId/like', isAuth, postController.likePost);

router.post('/:postId/comment', isAuth, postController.postComment);

router.delete('/:postId/comment/:commentId', isAuth, postController.postDeleteComment);

// remaining share features

module.exports = router;