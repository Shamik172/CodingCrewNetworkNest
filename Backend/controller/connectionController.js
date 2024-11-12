const mongoose = require('mongoose');
const User = require('../models/user');

exports.sendConnectionRequest = (req, res, next) => {
  const receiverUsername = req.params.username;
  const senderUsername = req.session.user.username;
  
  console.log(senderUsername);
  console.log(receiverUsername);

  // Rest of your logic remains the same
  User.findOne({ username: receiverUsername })
    .then(user => {
      if (!user) {
        return res.status(403).json({ message: "Not valid user." });
      }
      User.findOne({ username: senderUsername })
      .then(sender => {
        if (sender) {
          user.receivedRequests.push({username: senderUsername, name: sender.name});
          sender.sentRequests.push({username: receiverUsername, name: user.name});
          return sender.save();
        }
      })
      .then(result => {
        user.save();
        return res.status(200).json({ message: "Sent request successfully" });
      })
      })
    .catch(err => console.log(err));
};

exports.acceptRequest = (req, res, next) => {
  const receivername = req.params.username;
  const currentUser = req.session.user;

  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  User.findById(currentUser.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      // Remove the request from receivedRequests
      user.receivedRequests = user.receivedRequests.filter(request => request.username.toString() !== receivername);

      return User.findOne({ username: receivername }).then(newUser => {
        if (!newUser) {
          return res.status(404).json({ message: "No User found" });
        }

        // Check if there is a connection request
        if (newUser.sentRequests.findIndex(req => req.username === currentUser.username) === -1) {
          return res.status(404).json({ message: "No connection request found" });
        }

        // Add to connections
        newUser.connections.push({ username: currentUser.username, name: user.name });
        user.connections.push({ username: receivername, name: newUser.name });

        // Remove the request from sentRequests
        newUser.sentRequests = newUser.sentRequests.filter(request => request.username !== currentUser.username);

        // Save both users
        return Promise.all([user.save(), newUser.save()]);
      });
    })
    .then(() => {
      res.status(200).json({ message: "Request Accepted" });
    })
    .catch(err => {
      console.error("Error accepting request:", err);
      res.status(500).json({ message: "An error occurred" });
    });
};


exports.rejectRequest = (req, res, next) => {
  const receivername = req.params.username;
  const currentUser = req.session.user;

  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  User.findById(currentUser.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      // Remove the connection request from receivedRequests
      user.receivedRequests = user.receivedRequests.filter(request => request.username !== receivername);

      // Find the sender of the connection request
      return User.findOne({ username: receivername }).then(newUser => {
        if (!newUser) {
          return res.status(404).json({ message: "Receiver not found" });
        }

        // Check if the request exists in sentRequests
        const requestIndex = newUser.sentRequests.findIndex(req => req.username === currentUser.username);
        if (requestIndex === -1) {
          return res.status(404).json({ message: "No connection request found" });
        }

        // Remove the connection request from sentRequests
        newUser.sentRequests = newUser.sentRequests.filter(req => req.username !== currentUser.username);

        // Save both users' updates
        return Promise.all([user.save(), newUser.save()]);
      });
    })
    .then(() => {
      res.status(200).json({ message: "Request Rejected" });
    })
    .catch(err => {
      console.error("Error rejecting request:", err);
      res.status(500).json({ message: "An error occurred" });
    });
};

exports.getConnections = (req, res, next)=>{
  const username = req.params.username;
  // console.log("why this colaveri di", username);
  User.findOne({username : username})
  .then(user=>{
    let result = [];
    result.push({connections: user.connections});
    result.push({pendingRequests: user.pendingRequests});
    result.push({receivedRequests: user.receivedRequests});
    return res.status(200).json(result);
  })
  .catch(err=>console.log(err));
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

exports.getallConnections = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let alreadyConnected = user.connections;
    alreadyConnected = alreadyConnected.map(obj=>obj.username);
    let sentRequests = user.sentRequests;
    // console.log(sentRequests);
    sentRequests = sentRequests.map(obj=>obj.username);
    let receivedRequests = user.receivedRequests;
    receivedRequests = receivedRequests.map(obj=>obj.username);
  
    alreadyConnected.push(username);
    alreadyConnected = [...alreadyConnected,...receivedRequests,...sentRequests];
    // console.log("aleradadsldnl",alreadyConnected);
    let result = await User.find({ 
      username: { $nin: alreadyConnected } 
    });
    result = shuffleArray(result);
    // console.log("resultascas",result);
    res.status(200).json(result);
  } catch (error) { 
    console.log(error);
    res.status(500).json({ message: "An error occurred while retrieving connections" });
  }
};