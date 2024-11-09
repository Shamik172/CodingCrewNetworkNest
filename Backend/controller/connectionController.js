const mongoose = require('mongoose');
const User = require('../models/user');

exports.sendConnectionRequest = (req, res, next) => {
    //remaining check if already a connection
    ////////////////////////////////////////
    const senderUsername = req.session.user.username;
    const receiverUsername = req.params.username;
    console.log(senderUsername, receiverUsername);
    User.findOne({username: receiverUsername})
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "Not valid user."});
        }
        user.receivedRequests.push(senderUsername);
        User.findOne({username: senderUsername})
        .then(sender=>{
            sender.sentRequests.push(receiverUsername);
            return sender.save();
        })
        .catch(err=>console.log(err));
        return user.save();
    })
    .then(result=>{
        return res.status(200).json({message: "sent request successfully"});
    })
    .catch(err=>console.log(err));
}

exports.acceptRequest = (req, res, next) => {
    const receivername = req.params.username;
    const currentUser = req.session.user;
    User.findById(currentUser.id)
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        user.receivedRequests = user.receivedRequests.filter(request => request !== receivername);
        
        return User.findOne({username: receivername})
        .then(newUser => {
          if(!newUser){
            return res.status(404).json({ message: "No User found" });
          }
          if (newUser.sentRequests.indexOf(currentUser.username) === -1) {
            return res.status(404).json({ message: "No connection request" });
          }
          
          newUser.connections.push({username: currentUser.username, name: user.name});
          user.connections.push({username: receivername, name: newUser.name});
          newUser.sentRequests = newUser.sentRequests.filter(request => request !== currentUser.username);
      return Promise.all([user.save(), newUser.save()]).then(() => {
        return res.status(200).json({ message: "Request Accepted" });
      });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  });
}

exports.rejectRequest = (req, res, next) => {
    const receivername = req.params.username;
    const currentUser = req.session.user;

    User.findById(currentUser.id)
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        user.receivedRequests = user.receivedRequests.filter(request => request !== receivername);

        return User.findOne({username: receivername}).then(newUser => {
        if (!newUser) {
            return res.status(404).json({ message: "Receiver not found" });
        }
        if (newUser.sentRequests.indexOf(currentUser.username) === -1) {
          return res.status(404).json({ message: "No connection request" });
        }
        newUser.sentRequests = newUser.sentRequests.filter(request => request !== currentUser.username);

        return Promise.all([user.save(), newUser.save()]).then(() => {
        return res.status(200).json({ message: "Request Rejected" });
      });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  });
}