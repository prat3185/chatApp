var socket= io();
socket.on('connect',()=>{
    console.log("connected to server");
})

socket.on("newMessage",(object)=>{
    console.log("newMessage",object);
})