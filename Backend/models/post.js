const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description:{
        type: String
    }, 
    images:[{
        type: String
    }],
    videos: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    comment:[{
       user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
       },
       text: {
        type: String, 
        required: true,
       },
       createdAt:{
        type: Date,
        default: Date.now
       }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Post', postSchema);