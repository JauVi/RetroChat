const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// Connected users
var Users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('users', Users)
  console.log('A user connected, id: ' + socket.id);

  socket.on('chat',function(data) {
    var nick = data.Nick
    var msg = data.Message
    console.log(nick);
    console.log(msg);
    color = "";
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].Nick == nick) {
        color = Users[i].Color;
      }
    }
    console.log(color);
    io.emit("chat", {
      Color: color,
      Message: msg
    });
  });

  socket.on('join', (nick) => {
    console.log(nick);
    console.log(getColor());
    userFound = false;
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].Nick == nick) {
        userFound = true;
      }
    }

    if (userFound) {
      socket.emit('denied');
      console.log('User: ' + nick + ' denied');
    } else {
      obj = {
        Nick: nick,
        Socket: socket.id,
        Color: getColor()
      };
      socket.emit('joined',obj.Color);
      Users.push(obj);
      io.emit("chat", {
        Color: obj.Color,
        Message: obj.Nick + " has joined the chat..."
      });
      io.emit('users', Users)
      console.log('User: ' + nick + ' joined');
      for (let i = 0; i < Users.length; i++) {
        console.log(Users[i]);
      }
    }
  });

  socket.on('disconnect', () => {
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].Socket == socket.id) {
        io.emit("chat", {
          Color: Users[i].Color,
          Message: Users[i].Nick + " has left the chat..."
        });
        console.log(Users[i].Nick + " with socket id " + socket.id + ' left the chat');
        Users.splice(i,1);
        for (let i = 0; i < Users.length; i++) {
          console.log(Users[i]);
        }
        io.emit('users', Users)
        break
      }
    }
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

server.listen(8080, () => {
  console.log('listening on port: 8080');
});

function getColor(){ 
  return "hsl("+Math.floor(360 * Math.random())+",100%,50%)"
}