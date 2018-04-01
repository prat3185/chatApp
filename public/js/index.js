var socket= io();
socket.on('connect',()=>{
    console.log("connected to server");
})

socket.on("newMessage",(message)=>{
    console.log("newMessage",message);
    var li=$("<li></li>");
    li.text(`${message.from}:${message.text}`);
    $("#items").append(li);
})

$("#message-form").on("submit",function(e){
    e.preventDefault();
    socket.emit("createMessage",{
        from:"User",
        text:$("[name=message]").val()
    },function(){

    });
});