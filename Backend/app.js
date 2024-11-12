// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Message = require('./models/message');
require('dotenv').config();

// Import and initialize HTTP server and Socket.IO
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend origin for CORS
    methods: ["GET", "POST"],
    credentials: true
  },
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'uploads')));


const MONGODB_URI = process.env.MONGODB_URI; 

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,   
        store: store
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
}); 

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const jobRoutes = require('./routes/jobRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/job',  jobRoutes);
app.use('/connection', connectionRoutes);
app.use('/messages', messageRoutes);

io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
  
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    //   console.log(`User joined room: ${roomId}`);
    });
  
    socket.on("sendMessage", async (data) => {
      const { roomId, message } = data;
  
      // Save the message to the database
      const newMessage = new Message({
        roomId,
        sender: message.sender,
        receiver: message.receiver,
        text: message.text,
        timestamp: new Date(),
      });
      await newMessage.save();
  
      // Broadcast message to the room
      io.to(roomId).emit("receiveMessage", message);
    });
  
    socket.on("disconnect", () => {
    //   console.log("Client disconnected");
    });
  });

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
    .then(() => {
        server.listen(3000, () => {
            console.log("Server and Socket.IO listening on port 3000");
        });
    })
    .catch(err => console.log(err));

  