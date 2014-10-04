var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public/'));

// listen for messages posted and broadcast to the room
app.post('/message/:room', function(req, res){
  io.sockets.in('all').emit('update', req.body);
  io.sockets.in(req.params.room).emit('update', req.body);
  res.send(200);
});

server.listen(process.env.PORT || 3003);

io.sockets.on('connection', function(socket) {
  socket.emit('news', { hello: 'world!!!' });
  socket.on('subscribe', function(data) {
    socket.join(data.room);
  });
  socket.on('audience', function(data){
    io.sockets.in('audience').emit('audience', data);
  });
  socket.on('presentation', function(data){
    io.sockets.in('presentation').emit('presentation', data);
  });
});


