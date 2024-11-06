const mongoose = require('mongoose');
const User = require('../models/user');

exports.sendConnectionRequest = (req, res, next) => {
    //remaining check if already a connection
    ////////////////////////////////////////
    const senderId = req.session.user.id;
    const receiverUsername = req.params.username;
    User.findOne({username: receiverUsername})
    .then(user=>{
        if(!user){
            return res.status(403).json({message: "Not valid user."});
        }
        user.receivedRequests.push(senderId);
        User.findById(senderId)
        .then(sender=>{
            sender.sentRequests.push(user._id);
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
    const receiverId = req.params.userId;
    const currentUser = req.session.user.id;
    User.findById(currentUser)
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        user.connections.push(receiverId);
        user.receivedRequests = user.receivedRequests.filter(request => request.toString() !== receiverId.toString());

        return User.findById(receiverId).then(newUser => {
        if (!newUser) {
            return res.status(404).json({ message: "Receiver not found" });
        }

      newUser.connections.push(currentUser);
      newUser.sentRequests = newUser.sentRequests.filter(request => request.toString() !== currentUser.toString());

      
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
    const receiverId = req.params.userId;
    const currentUser = req.session.user.id;

    User.findById(currentUser)
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        user.receivedRequests = user.receivedRequests.filter(request => request.toString() !== receiverId.toString());

        return User.findById(receiverId).then(newUser => {
        if (!newUser) {
            return res.status(404).json({ message: "Receiver not found" });
        }
        newUser.sentRequests = newUser.sentRequests.filter(request => request.toString() !== currentUser.toString());

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