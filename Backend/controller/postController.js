const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const post = require('../models/post');

exports.postCreatePost = (req, res, next) => { 
    // console.log(req.body);
    // console.log(req.session.user);

    const {author, description, images, videos} = req.body;
    const user = req.session.user; 

    if(author.toString() !== user.id.toString()){
        return res.status(403).json({message: "Login First"});
    }

    const newPost = new Post({ 
        author: author,
        description, images, videos
    });
    newPost.save() 
    .then(savedPost=>{
        return User.findByIdAndUpdate(author, {
            $push: { posts: savedPost._id }
        }) 
    })
    .then(()=>{
        return res.status(200).json({message: "done"});
    })
    .catch(err=>console.log(err));
}

exports.likePost = (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.session.user.id; 
    // console.log(typeof(userId));
    let postFound;
    Post.findById(postId)
    .then(post=> {
        if(!post){
            return res.status(404).json({message: "No post found"});
        }
        // console.log("found this post: " + post);
        postFound = post;
        const isLiked = post.likes.includes(userId);
        console.log(isLiked);

        if(!isLiked){
            post.likes.push(userId);
            // console.log("not liked");
            return User.findByIdAndUpdate(userId, {
                $addToSet: {likedPosts : postId}
            })
        } else {
            post.likes = post.likes.filter(id => {
                id && id.toString() !== userId
        });
            return User.findByIdAndUpdate(userId, {
                $pull : {likedPosts: postId}
            })

        }
    })
    .then(() => { console.log(postFound); postFound.save();})
    .then( () => res.status(200).json({message: "liked post updated"}))
    .catch(err => console.log(err));
}

exports.postComment = (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.session.user.id; 
    const comment = req.body.comment;


    Post.findById(postId)
    .then(post=> {
        if(!post){
            return res.status(404).json({message: "No post found"});
        }

        const newComment = {
            user: userId,
            text: comment
        };
        post.comment.push(newComment);
        return post.save();
    })
    .then( () => res.status(200).json({message: "commented on post updated"}))
    .catch(err => console.log(err));
}

exports.postDeleteComment = (req, res, next) =>{
    // console.log(req.body);
    const postId = req.params.postId;
    const userId = req.session.user.id;
    const commentId = req.params.commentId;

    Post.findById(postId)
    .then(post=>{
        if(!post){
            return res.status(404).json({message: "post not found"});
        }
        const currentCommentIndex = post.comment.findIndex(comment=> comment.id === commentId);

        if(currentCommentIndex === -1){
            return -1;
        }
        // console.log( post.comment[currentCommentIndex].user + typeof(post.comment[currentCommentIndex].user));
        // console.log(userId + typeof(userId));

        if(post.comment[currentCommentIndex].user.toString() !== userId.toString()){
            return -2;
        }

        post.comment.splice(currentCommentIndex, 1);

        return post.save();
    })
    .then(result=> {
        if(result === -1){
            return res.status(404).json({message: "comment not found"});
        }
        if(result === -2){
            return res.status(404).json({message: "You are not authorized to delete the comment"});
        }

        console.log("odne");
        return res.status(200).json({message: "comment deleted successfully"});
    })
    .catch(err=>console.log(err));
} 

exports.postSHarePost = (req, res, next)=>{
    
}

