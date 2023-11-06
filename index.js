const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected.');

  socket.on('disconnect', () => {
    console.log('User left.');
  });


  
  socket.on('chat message', (data) => {
    io.emit('chat message', { name: data.name, message: data.message });
  });
});


server.listen(3000, () => {
  console.log('The server is running on port 3000.');
});


