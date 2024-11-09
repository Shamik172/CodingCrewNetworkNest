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


// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads'),
//     filename: (req, file, cb) => cb(null,file.filename + '-' + file.originalname)
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
//         cb(null, true);
//     } else {
//         cb(null, false);        
//     }
// }; 

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

// app.use(multer({storage: fileStorage, fileFilter: fileFilter }).fields([
//     { name: 'profilePicture', maxCount: 1 },
//     { name: 'coverPicture', maxCount: 1 }
// ]));

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const jobRoutes = require('./routes/jobRoutes');
const connectionRoutes = require('./routes/connectionRoutes');


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/job',  jobRoutes);
app.use('/connection', connectionRoutes);

// Socket.IO setup for real-time messaging
io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    // Handle joining a room
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    }); 

    // Handle sending a message
    socket.on("sendMessage", (data) => {
        const { roomId, message } = data;
        console.log("message received in roomId", roomId, message);
        io.to(roomId).emit("receiveMessage", message); // Send message to all in room
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
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

  