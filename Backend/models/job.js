const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({

    description:{
        type: String, 
        required: true,
        trim: true
    },
    role:{
        type: String,
        required: true
    },
    companyName:{
        type: String, required: true,
    },
    location:{
        type: String, 
        required: true,
        trim: true
    },
    city:{
        type : String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship'],
        required: true
    },
    experience:{
        type: String,
    },
    salary :{
        type: Number,
        required: true
    },
    qualification:{
        type: String, 
        enum:['Intermediate','Undergraduate', 'Postgraduate']
    },
    skillsRequired: {
        type: [String]
    },
    postedBy:{
        type: String
    },
    deadline:{
        type: Date,
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