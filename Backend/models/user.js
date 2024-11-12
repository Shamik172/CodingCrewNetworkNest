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
    profilePicture: { type: String },
    coverPicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String },
    gender: {type: String},
    skills: [ String ],
    projects: [{ title: String, description: String, tags: String}],
    connections: [{username: String, name: String}],
    pendingRequests: [{username: String, name: String}],
    receivedRequests: [{username: String, name: String}],
    education: [{schoolName:{type: String, required: true}, startDate: {type: Date, required: true}, 
        endDate: {type: Date, required: true, }}],
    experience:[{jobTitle: {type: String, required:true}, companyName: {type: String, required: true},
            startDate: {type: Date, required: true}, endDate: {type: Date, required: true, }}],
    sentRequests: [{username: String, name: String}],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    createdJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    rejectedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);