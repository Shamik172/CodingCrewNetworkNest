const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    description:{
        type: String, 
        required: true,
        trim: true
    },
    companyName:{
        type: String, required: true,
    },
    location:{
        type: String, 
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship'],
        required: true
    },
    salary :{
        type: Number
    },
    skillsRequired: {
        type: [String]
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    applications:[
        {
            applicantId:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            status:{
                type: String,
                enum: ['Pending', 'Accepted', 'Rejected'],
                default: 'Pending'
            }
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema);