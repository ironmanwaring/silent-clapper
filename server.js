

var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();


var socketio = require('socket.io'); 

server.on('request', app);


// creates a new connection server for web sockets and integrates
// it into our HTTP server 
// this needs to be below the server.on('request', app) so that our 
// express app takes precedence over our socekt server for typical 
// HTTP requests 
var io = socketio(server);

var host;

// // use socket server as an event emitter in order to listen for new connctions
io.on('connection', function(socket){


  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)
  var count = (io.engine.clientsCount);
  io.sockets.emit('connectionEvent', count);

  //event that runs anytime a socket disconnects
  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected. : (');
    count = (io.engine.clientsCount - 1)
    io.sockets.emit('connectionEvent', count) 
  })

  // server is receiving draw data from the client here 
  // so we want to broadcast that data to all other connected clients 
  socket.on('registerAction', function(icon){

    // we need to emit an event all sockets except the socket that originally emitted the 
    // the draw data to the server 
    // broadcasting means sending a message to everyone else except for the 
    // the socket that starts it 
    io.sockets.emit('showAction', icon); 
  }); 


})


app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

