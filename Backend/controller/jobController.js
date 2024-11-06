const Job = require('../models/job');
const mongoose = require('mongoose');
const User = require('../models/user');



exports.createJob = (req, res, next) => {
    // if(req.session.user.toString() !== req.user)

    const title = req.body.title;
    const description = req.body.description;
    const companyName = req.body.companyName;
    const location = req.body.location;
    const jobType = req.body.jobType;
    const salary = req.body.salary;
    const skillsRequired = req.body.skillsRequired;
    
    const postedBy = req.session.user.id;

    if(!title || !description || !companyName || !location || !salary || !skillsRequired || !jobType || !postedBy){
        return res.status(403).json({message: "Complete required fields"});
    }

    const newJob = new Job({
        title: title,
        description: description,
        companyName: companyName,
        location: location,
        jobType: jobType,
        salary: salary,
        skillsRequired: skillsRequired,
        postedBy: req.session.user.id,
        postDate: Date.now()
    });

    newJob.save()
    .then(()=>{
        User.findById(postedBy)
        .then(user=>{
            // console.log(newJob);
           user.createdJobs.push(newJob._id);
           user.save();
           next();
        })
        .catch(err=>console.log(err));
        return res.status(200).json({message: "Job posted successfully"});
    })
    .catch(err => console.log(err));
}

exports.deleteJob = (req, res, next) => {
    const jobId = req.params.jobId;
    if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(403).json({message: "Not valid job"});
    }
    Job.findById(jobId)
    .then(job=>{
        if(!job){
            return -1;
        }
        if(job.postedBy.toString() != req.session.user.id.toString()){
            return -2;
        }
        return Job.findByIdAndDelete(jobId);
    })
    .then(result=>{
        if(result === -1)return res.status(403).json("Job not found");
        if(result === -2)return res.status(403).json("You are not authorized to delete this job");
        return res.status(200).json("Deleted the job");
    })
    .catch(err=>console.log(err));
}

exports.applyJob = (req, res, next) => {
    const curUser = req.session.user.id;
    console.log(typeof(curUser));
    const jobId = req.params.jobId;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(403).json({message: "Not valid job"});
    }

    Job.findById(jobId)
    .then(job=>{
        if(!job){
            return -1;
        }
        if(job.postedBy.toString() === curUser.toString()){
            return -2;
        }
        const alreadyApplied = job.applications.some(obj=>obj.applicantId.toString() === curUser.toString());
        if(alreadyApplied)return -3;
        
        User.findById(curUser)
        .then(user=>{
            user.appliedJobs.push(job._id);
            job.applications.push({applicantId: user._id, status: "Pending"});
            return user.save();
        })
        .then(()=>{
            job.save();
            return;
        })
    })
    .then(result=>{
        if(result === -1)return res.status(403).json("Job not found");
        if(result === -2)return res.status(403).json("You cannot apply for this job");
        if(result === -3)return res.status(403).json("You have already applied");
        return res.status(200).json({message: "applied for job successfully"});
    })
}

exports.filterJob = (req, res, next) => {
    const {title, location, companyName, skillsRequired, jobType} = req.query;
    const filter = {};

    if(title){
        filter.title = {$regex: title, $options: "i"}
    }

    if(location){
        filter.location = {$regex: location, $options: "i"}
    }

    if(skillsRequired){
        filter.skillsRequired = {$regex: skillsRequired, $options: "i"}
    }

    if(companyName){
        filter.companyName = {$regex: companyName, $options: "i"}
    }

    if(jobType){
        filter.jobType = {$regex: jobType, $options: "i"}
    }


    Job.find(filter)
    .then(jobs=>{
        return res.status(200).json(jobs);
    })
    .catch(err=>console.log(err));
}

//Pending->
//acceptJobRequest
//deleteJobRequest