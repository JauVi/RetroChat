
var socket = io('http://pellonvpn.ddns.net', {resource: 'nodejs'});
var myColor = "";

// Send message when pressin enter
document.getElementById("message").addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("send").click();
    }
});

// Joining with nick when pressing enter
document.getElementById("nick").addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("join").click();
    }
});

// Adding chat message to page when received a 'chat' event 
socket.on('chat', function(data) {
    console.log(data);
    printMessage(data.Message,data.Color);
});

// Hiding login dialog and enabling message sending when 'joined' event was received
socket.on('joined', function(color) {
    myColor = color;
    document.getElementById("dialog").style.display ="none";
    document.getElementById("send").disabled = false;
    document.getElementById("message").disabled = false;
    printMessage("You have joined the chat. Type 'help?-' to see available commands",myColor);
});

// Printing message if nick was denied
socket.on('denied', function(msg) {
    console.log(msg);
    document.getElementById("deniedText").innerText = "Nick was reserved!";
});

// Update of online users
socket.on('users', function(Users) {
    console.log("Users" + Users);
    var text = "";
    for (let i = 0; i < Users.length; i++) {
        console.log(Users[i].Nick);
        text = text + "<div style=\"color:" + Users[i].Color + ";\">" + Users[i].Nick + "</div>";
        document.getElementById("onlineList").innerHTML = text;
    }
});

// Checking user input for commands or chat message when clicking send 
function sendClicked(){
    var message = document.getElementById("message").value;
    var nick = document.getElementById("nick").value;
    document.getElementById("message").value = "";

    console.log(message.substr(0, 15));
    if (message.substr(0, 15) == "help?-"){
        printMessage("Start every command with 'command: ' after that, give the command.",myColor);
        printMessage("'command: color r,g,b' changes the color theme according to the given values." ,myColor);
    }
    else if (message.substr(0, 15) == "command: color "){
        changeColor(message.substr(15, 11));
    } else {
        socket.emit('chat', {
            Nick: nick,
            Message: nick + " wrote: " + message
        });
    }
}

// Printing of message to page with color
function printMessage(message,color){
    var text = document.getElementById("messagesList").innerHTML;
    text = text + "<div style=\"color:" + color + ";\">" + message + "</div>";
    document.getElementById("messagesList").innerHTML = text;
    document.getElementById("messagesList").scrollTop = document.getElementById("messagesList").scrollHeight;
}

// Sending join event with desired nick to the server when clicked join
function join(){
    var nick = document.getElementById("nick").value;
    if (nick.length > 0){
        socket.emit('join', nick);
    }
}

// Changing element colors to given
function changeColor(color){
    var x = document.getElementsByClassName("greenBox");
    var i;
    console.log(color);
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor = "rgb("+color+")";
        x[i].style.color = "rgb("+color+")";
        x[i].style.TextColor = "rgb("+color+")";
    }
}