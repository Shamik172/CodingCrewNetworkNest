const User = require('../models/user');

exports.getUserProfile = (req, res, next) =>{
    // console.log(req.params.userId);
    User.findOne({username: req.params.username}).select('-password')
    .then(user=>{
        console.log(user);
        res.status(200).json(user);
    })
    .catch(err=>console.log(err));
}

exports.postEditUser = (req, res, next) => {

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

    if(!newName){
        return res.status(400).json({message: 'Required Name'});
    }
    User.findOne({name: req.params.username}).select('-password')
    .then(user=>{
        user.name = newName;
        user.profilePicture = newProfilePicture;
        user.coverPicture = newCoverPicture;
        user.bio = newBio;
        res.status(200).json(user);
        return user.save();
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