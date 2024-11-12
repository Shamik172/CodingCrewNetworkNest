const http = require('http');
const express = require('express');
const path = require('path');
const {Server} = require('socket.io');
const { Socket } = require('dgram');
// console.log(Server)
const app = express();
const server = http.createServer(app);

const io= new Server(server);
app.use(express.static(path.resolve("./public")));


app.get('/',(req,res,next)=>{
    return res.sendFile('/public/index.html')
})


//sockect io
io.on('connection', socket=>{
    socket.on('user-message', message=>{
        console.log('A new USER Message', message);
        io.emit('message',message);
    })
  console.log('A new user has connected', socket.id);
})


server.listen(9000 ,()=>console.log(`Server Started at PORT:9000`));