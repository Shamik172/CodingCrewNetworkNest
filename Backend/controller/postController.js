const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const { uploadOnCloudinary } = require('../cloudaniary');


exports.postCreatePost = async (req, res, next) => {
    try {
        console.log(req.body); // Check incoming post data
        console.log(req.files); // Check the uploaded files (images/videos)

        const { description } = req.body;
        const author = req.session.user;

        if (!author) {
            return res.status(403).json({ message: "Login First" });
        }

        // Initialize arrays to hold file URLs
        const images = [];
        const videos = [];

        // Upload images to Cloudinary
        if (req.files?.images) {
            // console.log("images are present")
            for (let i = 0; i < req.files.images.length; i++) {
                const cloudinaryResult = await uploadOnCloudinary(req.files.images[i].path);
                if (cloudinaryResult) {
                    images.push(cloudinaryResult.secure_url); // Add Cloudinary URL to images array
                }
            }
        }

        // Upload videos to Cloudinary
        if (req.files?.videos) {
            for (let i = 0; i < req.files.videos.length; i++) {
                const cloudinaryResult = await uploadOnCloudinary(req.files.videos[i].path, 'video'); // Optional: specify upload type as video
                if (cloudinaryResult) {
                    videos.push(cloudinaryResult.secure_url); // Add Cloudinary URL to videos array
                }
            }
        }

        // Create a new post
        let newPost = new Post({
            author: author.id,
            description,
            images,
            videos,
            username: author.username
        });

        // Fetch user details to add additional information to the post
        const user = await User.findById(author.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user profile details to the new post
        newPost.profileUrl = user.profilePicture;
        // newPost.coverUrl = user.coverPicture;
        newPost.name = user.name;

        // Save the new post to the database
        await newPost.save();

        // Push the new post id to the user's posts array
        user.posts.push(newPost._id);
        await user.save();

        // Return success response
        res.status(200).json({ message: "Post created successfully", post: newPost });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating the post", error: err.message });
    }
};


//+++++++++++++++++++++++++++++++++++++++
//my code
/*

exports.getAllPosts = (req, res, next)=>{
    // const username = req.session.user.username;
    Post.find().
    then(allPosts=>{
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

exports.getUserPosts = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(200).json("No user found");
      }
      const posts = await Post.find({ author: user._id });
      return res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error fetching user posts");
    }
  };
  

exports.likePost = (req, res, next) => {
    const postId = req.params.postId;
    if(!req.session){
        return res.status(404).json({message: "Login First"});
    }
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
        // console.log(isLiked);
        let result = 0;

        if(!isLiked){
            post.likes.push(userId);
            result = 1;
            // console.log("not liked");
            return User.findByIdAndUpdate(userId, {
                $addToSet: {likedPosts : postId}
            })
        } else {
            result = -1;
            post.likes = post.likes.filter(id => {
                id && id.toString() !== userId
        });
            return User.findByIdAndUpdate(userId, {
                $pull : {likedPosts: postId}
            })

        }
    })
    .then(() => { console.log(postFound); postFound.save();})
    .then( () => res.status(200).json(result))
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

