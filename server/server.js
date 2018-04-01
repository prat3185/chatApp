const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');

var {generateMessage,generateLocationMessage} = require('./utils/message');
var pathToServe=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);


app.use(express.static(pathToServe));

io.on('connection',(socket)=>{
    console.log("new user connected");
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","New User Joined"));

    socket.on("createMessage",(message,callback)=>{
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage("Admin",coords));
    })

})


server.listen(port,()=>{
    console.log("App listening on port "+ port);
})

