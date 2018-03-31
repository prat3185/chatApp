const path=require('path');
const express=require('express');

var pathToServe=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;
var app=express();

app.use(express.static(pathToServe));

app.listen(port,()=>{
    console.log("App listening on port "+ port);
})

