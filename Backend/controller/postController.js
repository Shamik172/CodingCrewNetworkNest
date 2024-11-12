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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        Post.aggregate([
            { $skip: skip },          // Apply pagination first
            { $limit: limit },        // Limit documents to the specified limit
            { $sample: { size: limit } } // Randomly sample from the paginated subset
        ])
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
  
exports.likePost = async (req, res) => {
    const { postId } = req.params;
    if(!req.session)return res.status(400).json({message: "Login first"});
    const userId = req.session.user.id;
    let postFound;
  
    try {
      postFound = await Post.findById(postId);
      if (!postFound) {
        return res.status(404).json({ message: "No post found" });
      }
  
      const isLiked = postFound.likes.includes(userId);
      let result = 0;
  
      if (!isLiked) {
        postFound.likes.push(userId);
        result = 1;
        await User.findByIdAndUpdate(userId, { $addToSet: { likedPosts: postId } });
      } else {
        postFound.likes = postFound.likes.filter(id => id.toString() !== userId.toString());
        result = -1;
        await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } });
      }
  
      await postFound.save();
  
      res.status(200).json({ result, likesCount: postFound.likes.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

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

