const Job = require('../models/job');
const mongoose = require('mongoose');
const User = require('../models/user');



exports.createJob = (req, res, next) => {
    // Log the body for debugging
    console.log(req.body);  
    
    const { description, companyName, location, jobType, salary, requiredSkills, deadline, role, city, experience, qualification } = req.body;
    
    const postedBy = req.session.user.username;
    // console.log(postedBy);

    // Check if all required fields are provided
    if(!description || !companyName || !location || !salary || !role || !city || !qualification || !deadline || !jobType) {
        console.log("this is the issue");
        return res.status(403).json({ message: "Complete required fields" });
    }

    // Create the new job document
    const newJob = new Job({
        description: description,
        companyName: companyName,
        location: location,
        jobType: jobType,
        salary: salary,
        skillsRequired: requiredSkills,
        postedBy: req.session.user.username,
        role: role,
        city: city,
        experience: experience,
        qualification: qualification,
        deadline: deadline,
        postDate: Date.now()
    });

    // Save the new job and update the user document
    newJob.save()
        .then(() => {
            // Find the user who posted the job and add the new job ID to their createdJobs array
            User.findOne({ username: postedBy })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }

                    // Add the new job ID to the createdJobs array
                    user.createdJobs.push(newJob._id);

                    // Save the updated user document
                    user.save()
                        .then(() => {
                            // Send success response after everything is updated
                            return res.status(200).json({ message: "Job posted successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({ message: "Error updating user with new job" });
                        });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: "Error finding user" });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Error saving job" });
        });
};

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
    // console.log(typeof(curUser));
    const jobId = req.params.jobId;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(403).json({message: "Not valid job"});
    }

    Job.findById(jobId)
    .then(job=>{
        if(!job){
            return -1;
        }
        if(job.postedBy.toString() === req.session.user.username.toString()){
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
        if(result === -1)return res.status(404).json("Job not found");
        if(result === -2)return res.status(404).json("You cannot apply for this job");
        if(result === -3)return res.status(200).json("You have already applied");
        return res.status(200).json({message: "applied for job successfully"});
    })
}

exports.filterJob = (req, res, next) => {
    const requestFilter = req.body;
    const filter = {};

    // Add conditions to filter object based on provided fields
    if (requestFilter.selectedCity) {
        filter.city = { $regex: requestFilter.selectedCity, $options: "i" };
    }

    if (requestFilter.selectedState) {
        filter.city = { $regex: requestFilter.selectedState, $options: "i" };
    }

    if (requestFilter.selectedJobTitle) {
        filter.role = { $regex: requestFilter.selectedJobTitle, $options: "i" };
    }

    if (requestFilter.selectedCompany) {
        filter.companyName = { $regex: requestFilter.selectedCompany, $options: "i" };
    }

    if (requestFilter.selectedRole) {
        filter.jobType = { $regex: requestFilter.selectedRole, $options: "i" };
    }


    // Find jobs that match all included filters
    Job.find(filter)
        .then(jobs => {
            res.status(200).json(jobs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "An error occurred while fetching jobs." });
        });
};


exports.getAllJobsByUser = (req, res, next) => {
    const username = req.params.username;
    // console.log(username);
    
    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            // Create an array of promises
            const jobPromises = user.createdJobs.map(jobId => {
                return Job.findById(jobId);
            });

            // Use Promise.all to wait for all promises to resolve
            Promise.all(jobPromises)
                .then(jobs => {
                    // console.log("All jobs:", jobs);
                    return res.status(200).json(jobs);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: "Error fetching jobs" });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Error finding user" });
        });
};

exports.getAppliedJobsByUser = (req, res, next) => {
    const userId = req.session.user.id;
    console.log("this is")
    User.findById(userId)
        .then(async (user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const appliedJobIds = user.appliedJobs;
            console.log(appliedJobIds);
            const appliedJobsDetails = await Job.find({ _id: { $in: appliedJobIds } });
            console.log(appliedJobsDetails);
            res.status(200).json(appliedJobsDetails);
        })
        .catch((err) => {
            console.error('Error fetching applied jobs:', err);
            res.status(500).json({ message: 'An error occurred while fetching applied jobs' });
        });
};

exports.saveJob = (req, res, next) =>{
    const jobId = req.params.jobId;
    // console.log(req.session);
    const userId = req.session.user.id;

    User.findById(userId)
    .then(user=>{
        // console.log("fuckup");
        if (user.savedJobs.findIndex(job => job.id.toString() === jobId.toString()) === -1) {
            user.savedJobs.push(new mongoose.Types.ObjectId(jobId));
        }
        else{
            user.savedJobs = user.savedJobs.filter(job=>job.toString() !== jobId.toString());
        }
       user.save();
       return res.status(200).json({message: "Saved job successfully"});
    })
    .catch(err=>console.log(err));
}

exports.getAllJobs = (req, res, next) =>{
    const result = [];
    Job.find()
    .then(jobs=>{
        // console.log(jobs);
        jobs = jobs.filter(job => job.postedBy !== req.session.user.username);
        // console.log(jobs);
        return res.status(200).json(jobs);
    })
    .catch(err=>console.log(err));
}

exports.getJob = (req, res, next) => {
    const jobId = req.params.jobId;
    // console.log(jobId);
    Job.findById(jobId)
    .then(job=>{
        // console.log(job);
        return res.status(200).json(job);
    })
    .catch(err=>console.log(err));
}

//Pending->
//acceptJobRequest
//deleteJobRequest