var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/slides/assets/'));

app.get('/slides', function(req, res){
  fs.readFile(__dirname + '/slides/slides.html',
  function (err, data) {
    if (err) {
      return res.send('Error loading slides');
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.get('/handouts', function(req, res){
  fs.readFile(__dirname + '/slides/handouts.html',
  function (err, data) {
    if (err) {
      return res.send('Error loading slides');
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.post('/message/:room', function(req, res){
  io.sockets.in('all').emit('update', req.body);
  io.sockets.in(req.params.room).emit('update', req.body);
  res.send(200);
});

app.get('/theindexpage.html', function(req, res){
  fs.readFile(__dirname + '/slides/index.html',
  function (err, data) {
    if (err) {
      return res.send('Error loading index.html');
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.get('/fullpage', function(req, res){
  fs.readFile(__dirname + '/slides/fullpage.html',
  function (err, data) {
    if (err) {
      return res.send('Error loading slides');
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
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


