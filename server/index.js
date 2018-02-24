const app = require('express')();

const http = require('http').Server(app);
const io= require("socket.io")(http);

app.get("/", (req,res) => {

    res.sendFile(__dirname + '/index.html');
    //res.send("hello world");

})


io.on("connection", (socket)=>{
    io.emit('chat message', "a user just connected");
    console.log("a user connected");

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });

    socket.on('disconnect', function(){
        io.emit('chat message', "a user disconnected");
        console.log('a user disconnected');
      });
})


http.listen(3000, ()=>{
console.log("listening on port 3000")

})