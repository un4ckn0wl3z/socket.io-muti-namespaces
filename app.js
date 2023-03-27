var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/client', function(req, res){
    res.sendFile(__dirname + '/static/client.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/static/admin.html');
});
   
var nsp_client = io.of('/client');
nsp_client.on('connection', function(socket){
   console.log('someone connected');
   nsp_client.emit('hi', 'Hello everyone in #client-ns!');
});

var nsp_admin = io.of('/admin');
nsp_admin.on('connection', function(socket){
   console.log('someone connected');
   nsp_admin.emit('hi', 'Hello everyone in #admin-ns!');
});
http.listen(3000, function(){
   console.log('listening on localhost:3000');
});