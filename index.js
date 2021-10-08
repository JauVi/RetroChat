const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Default route for all other requests like images and so on
app.use(express.static("public"));

// Connected users
var Users = [];

// Route for index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// When socket connects
io.on('connection', (socket) => {

  // Sending user to client right away even before nick registration
  socket.emit('users', Users)
  console.log('A user connected, id: ' + socket.id);

  // Relaying 'chat' events to all connected users and sending the right color for that user along with the message
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
  
  // Checking if nickname is reserved when 'join' event is received
  socket.on('join', (nick) => {
    console.log(nick);
    userFound = false;
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].Nick == nick) {
        userFound = true;
      }
    }
    // Sending denied if user was allready registered
    if (userFound) {
      socket.emit('denied');
      console.log('User: ' + nick + ' denied');
    // Adding user to list with random bright color
    } else {
      obj = {
        Nick: nick,
        Socket: socket.id,
        Color: getColor()
      };
      // Send infomation about succesfull nick registration to user
      socket.emit('joined',obj.Color);
      Users.push(obj);
      // Sending information about user joining to all users
      io.emit("chat", {
        Color: obj.Color,
        Message: obj.Nick + " has joined the chat..."
      });
      // Send updated user list to all users
      io.emit('users', Users)
      console.log('User: ' + nick + ' joined');
      for (let i = 0; i < Users.length; i++) {
        console.log(Users[i]);
      }
    }
  });

  // Removing user from list id disconnected
  socket.on('disconnect', () => {
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].Socket == socket.id) {
        // Notifying other users
        io.emit("chat", {
          Color: Users[i].Color,
          Message: Users[i].Nick + " has left the chat..."
        });
        console.log(Users[i].Nick + " with socket id " + socket.id + ' left the chat');
        Users.splice(i,1);
        for (let i = 0; i < Users.length; i++) {
          console.log(Users[i]);
        }
        // Sending updated user list
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

// Starting server
server.listen(8080, () => {
  console.log('listening on port: 8080');
});

// Generating random bright color using HSL color mode
function getColor(){ 
  return "hsl("+Math.floor(360 * Math.random())+",100%,50%)"
}