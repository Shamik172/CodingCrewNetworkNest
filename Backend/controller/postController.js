const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
// const post = require('../models/post');

exports.postCreatePost = (req, res, next) => { 
    console.log(req.body);

    const { description, images, videos } = req.body;
    const author = req.session.user;

    if (!author) {
        return res.status(403).json({ message: "Login First" });
    }

    // Creating a new post with initial details
    let newPost = new Post({ 
        author: author.id,
        description,
        images,
        videos
    });

    // Fetch user details to add additional information to the post
    User.findById(author.id)
    .then(user => {
        if (!user) {
            return -1;
        }
        console.log(user);
        // const newPost = new Post({

        // })
        newPost.profileUrl = user.profilePicture;
        newPost.coverUrl = user.coverPicture;
        newPost.name = user.name;
        newPost.bio = user.bio;
        // console.log(curPost);
        newPost.save()
        user.posts.push(newPost._id);
        user.save();
        return -2;
    })
    .then(statuss=>{
        if(statuss == -1)return res.status(404).json({message: "User not found"});
        else if(statuss == -2)return res.status(200).json({message: "Post created successfully"});
        else res.status(404).json({message: "Something went wrong"});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ message: "An error occurred" });
    });
};

//+++++++++++++++++++++++++++++++++++++++
//my code
/*
exports.getAllPosts = (req, res, next)=>{
    Post.find().
    then(allPosts=>{
        // console.log("Reached");
        // console.log("AllPosts",allPosts);
        // console.log(typeof(allPosts));
        return res.status(200).json(allPosts);
    })
    .catch(err=>console.log(err)); 
}*/
//+++++++++++++++++++++++++++++++++++++
//------------------------------------
    //check code
    exports.getAllPosts = (req, res, next) => {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
        console.log("Fetching posts... Page:", page, "Limit:", limit); // Debugging log
        // Calculate the number of posts to skip for pagination
        const skip = (page - 1) * limit;
    
        Post.aggregate([{$sample: {size : 10}}])
            .skip(skip) // Skip the documents for previous pages
            .limit(limit) // Limit the number of documents returned to the specified limit
            .then(allPosts => {
                res.status(200).json(allPosts);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Failed to fetch posts' });
            });
    };
    

    
//------------------------------------

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

