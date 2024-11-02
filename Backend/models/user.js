const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    username:{ 
        type: String,
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String },
    skills: [{ type: String }],
    interests: [{ type: String }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);