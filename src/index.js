// Core modules
const path = require('path');
const http = require('http');
// Npm modules
const express = require('express');
const socketio = require('socket.io');
// Server & Express config
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

io.on('connection', socket => {
  socket.emit('message', 'Welcome!!!');
  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('sendLocation', coords => {
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
  });

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', message);
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'An user has left!');
  });
});

server.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});