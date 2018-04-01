const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');

var pathToServe=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);


app.use(express.static(pathToServe));

io.on('connection',(socket)=>{
    console.log("new user connected");
    socket.emit("newMessage",{
        from:"Admin",
        text:"welcome to chat app",
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit("newMessage",{
        from:"Admin",
        text:"New User Joined",
        createdAt: new Date().getTime()
    })

    socket.on("createMessage",(message)=>{
        io.emit("newMessage",{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    })

})


server.listen(port,()=>{
    console.log("App listening on port "+ port);
})

