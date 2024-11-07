const User = require('../models/user');

exports.getUserProfile = (req, res, next) =>{
    // console.log(req.params.userId);
    User.findOne({username: req.params.username}).select('-password')
    .then(user=>{
        console.log("use", user);
        res.status(200).json(user);
    })
    .catch(err=>console.log(err));
}

exports.getUserProfilePage = (req, res, next) =>{
    // console.log(req.params.userId);
    const userId = req.params.userId;
    User.findById(userId).select('-password')
    .then(user=>{
        // console.log("use", user);
        const returnObject = {username : user.username, 
                                name: user.name, 
                                email: user.email, 
                                bio: user.bio, 
                                profilePicture: user.profilePicture,
                            coverPicture: user.coverPicture
                        };
        res.status(200).json(returnObject);
    })
    .catch(err=>console.log(err));
}

exports.postCoverPicture = (req, res, next)=>{
    const userId = req.params.userId;
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(404).json({message: "No user found"});
        }
        user.coverPicture = req.file.path;
        user.save();
        return res.status(200).json({message: "updated successfully"});
    })
    .catch(err=>console.log(err));
}

exports.postProfilePicture = (req, res, next)=>{
    console.log(req.body);
    const userId = req.params.userId;
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(404).json({message: "No user found"});
        }
        console.log(req.file);
        user.profilePicture = req.file.path;
        user.save();
        return res.status(200).json({message: "updated successfully"});
    })
    .catch(err=>console.log(err));
}

exports.getEditUser = (req, res, next) => {

    // console.log(req.params.username);
    // console.log(req.session.user.username);
    if(req.params.username !== req.session.user.username){
        return res.status(403).json({message: "Login First"});
    }
    const newName = req.body.name;
    // console.log(newName);
    // console.log(req.body.name);
    const newProfilePicture = req.body.profilePicture;
    const newCoverPicture = req.body.coverePicture;
    const newBio = req.body.bio;
    const newSkills = req.body.skills;
    const newInterest = req.body.interests;

    if(!newName){
        return res.status(400).json({message: 'Required Name'});
    }
    User.findOne({name: req.params.username}).select('-password')
    .then(user=>{
        user.name = newName;
        user.profilePicture = newProfilePicture;
        user.coverPicture = newCoverPicture;
        user.bio = newBio;
        user.skills = newSkills;
        user.interests = newInterest;
        res.status(200).json(user);
        user.save();
        return user;
    })
    .catch(err=>console.log(err));
}

exports.addSkill = (req, res, next)=>{
    const userId = req.params.userId;
    const addSkill = req.params.skillName;

    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "User not found"});
        }
        user.skills.push(addSkill);
        user.save();
        // console.log(user.skills);
        res.json(user.skills);
    })
    .catch(err=>console.log(err));
}

exports.getDefaultSkills = (req, res, next)=>{
    const userId = req.params.userId;
    // console.log(typeof(userId)); 
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "User not found"});
        }
        // console.log(typeof(user.skills)); 
        res.status(200).json(user.skills);
    })
    .catch(err=>console.log(err));
}

exports.deleteSkill = (req, res, next) => {
    const userId = req.params.userId;
    const skillName = req.params.skillName;
 
    User.findById(userId)
    .then(user=>{ 
        if(!user){
            return;
        }
        const newSkills = user.skills.filter(skill=> skill !== skillName);
        user.skills = newSkills;
        user.save();
        res.status(200).json(user.skills);
    })
}

exports.deleteEducation = (req, res, next) => {
    const userId = req.params.userId;
    const eduIndex = req.params.index;
    console.log(eduIndex);
    User.findById(userId)
    .then(user=>{ 
        if(!user){
            return;
        }
        const newEdu = user.education.filter((_, i) => {return (i.toString() !== eduIndex.toString())});
        user.education = newEdu;
        user.save();
        res.status(200).json(user.education);
    })
}

exports.deleteExperience = (req, res, next) =>{
    const userId = req.params.userId;
    const expIndex = req.params.index;
    // console.log(expIndex);
    User.findById(userId)
    .then(user=>{ 
        if(!user){
            return;
        }
        const newExp = user.experience.filter((_, i) => {return (i.toString() !== expIndex.toString())});
        user.experience = newExp;
        user.save();
        res.status(200).json(user.experience);
    })
    .catch(err=>console.log(err));
}

exports.getDefaultEducation = (req, res, next)=>{
    const userId = req.params.userId;
    // console.log(typeof(userId)); 
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "User not found"});
        }
        // console.log(typeof(user.skills)); 
        res.status(200).json(user.education);
    })
    .catch(err=>console.log(err));
}

exports.getDefaultExperience = (req, res, next) => {
    const userId = req.params.userId;
    // console.log(typeof(userId)); 
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "User not found"});
        }
        // console.log(typeof(user.skills)); 
        res.status(200).json(user.experience);
    })
    .catch(err=>console.log(err));
}

exports.addEducation = (req, res, next) => {
    const userId = req.params.userId;
    const formData = req.body;
    // console.log(req.body);
    // formData = {...formData};
    // console.log(formData);
    const newObj = {schoolName: formData.schoolName, startDate: formData.startDate, endDate: formData.endDate};
     User.findById(userId)
     .then(user=>{
        if(!user){
            console.log("error");
            return;
        }
        if (!Array.isArray(user.education)) {
            user.education = [];  // Initialize if not already an array
        }
        user.education.push(newObj);
        user.save();
        return res.status(200).json(user.education);
     })
     .catch(err=>console.log(err));
}

exports.addExperience = (req, res, next)=>{
    const userId = req.params.userId;
    const formData = req.body;
    // console.log(req.body);
    // formData = {...formData};
    // console.log(formData);
    const newObj = {jobTitle: formData.jobTitle, companyName: formData.companyName, startDate: formData.startDate, endDate: formData.endDate};
     User.findById(userId)
     .then(user=>{
        if(!user){
            console.log("error");
            return;
        }
        if (!Array.isArray(user.experience)) {
            user.education = [];  // Initialize if not already an array
        }
        user.experience.push(newObj);
        user.save();
        return res.status(200).json(user.experience);
     })
     .catch(err=>console.log(err));
}

exports.searchUser = (req, res, next) => {
    const {name, username} = req.query;
    const filter = {};
    if(name){
        filter.name = {$regex : name, $options: "i"}
    }
    if(username){
        filter.username = {$regex : username, $options: "i"}
    }

    User.find(filter)
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    })
}