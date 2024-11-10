const User = require('../models/user');
const Job = require('../models/job');

exports.getUserProfile = (req, res, next) =>{
    // console.log(req.params);
    const username = req.params.username;
    User.findOne({username: username}).select('-password')
    .then(user=>{
        // console.log("use", user);
        return res.status(200).json(user);
    })
    .catch(err=>console.log(err));
} 
 
exports.getUserProfilePage = (req, res, next) =>{
    // console.log(req.params.userId);
    const userId = req.params.userId;
    // console.log(userId);
    User.findById(userId).select('-password')
    .then(user=>{
        // console.log("use", user);
        const returnObject = {username : user.username, 
                                name: user.name, 
                                email: user.email,
                                gender: user.gender, 
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
    // console.log(req.body);
    console.log(req.file);
    const userId = req.params.userId;
    User.findById(userId)
    .then(user=>{
        if(!user){
            return res.status(404).json({message: "No user found"});
        }
        console.log(req.file);
        // user.profilePicture = req.files.path;
        // user.save();
        return res.status(200).json({message: "updated successfully"});
    })
    .catch(err=>console.log(err));
}

exports.getEditUser = (req, res, next) => {
    if(req.params.userId.toString() !== req.session.user.id.toString()){
        return res.status(403).json({message: "Login First"});
    }
    const newName = req.body.name;
    const newBio = req.body.bio;

    if(!newName){
        return res.status(400).json({message: 'Required Name'});
    }
    User.findById(req.params.userId)
    .then(user=>{
        user.name = newName;
        user.bio = newBio;
        user.save();
        return res.status(200).json({message: "Updated successfully"});
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

exports.searchAll = (req, res, next) => {
    const searchQuery = req.body.searchQuery;
    // console.log(req.body);
    let result = {};
    console.log(searchQuery);
    // Define filters with correct regex options
    const filterUser = {
        $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { username: { $regex: searchQuery, $options: "i" } }
        ]
    };

    // Use Promise.all to run both queries concurrently
    User.find(filterUser)
    .then((users) => {
        result = {users};
        return res.status(200).json(result); // Send the combined result
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "An error occurred while searching." });
    });
};

exports.getAllConnections = (req, res, next)=>{
    const username = req.params.username;
    // console.log("Fuckup");
    User.findOne({username: username})
    .then(user=>{
        if(!user)return res.status(404).json({message: "User doesnot exists"});
        // console.log(user.connections);
        return res.status(200).json(user.connections);
    })
    .catch(err=>console.log(err));
}

exports.postProject = (req, res, next) => {
    const newProject = req.body;
    User.findById(req.session.user.id)
    .then(user=>{
        user.projects.push(newProject);
        user.save();
        return res.status(200).json(user.projects);
    })
    .catch(err=>console.log(err));
}

exports.getProject = (req, res,next) => {
    let result = [];
    User.findById(req.session.user.id)
    .then(user=>{
        result = user.projects;
        return res.status(200).json(result);
    })
    .catch(err=>console.log(err));
}