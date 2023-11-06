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
  console.log('Kullanıcı bağlandı.');

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı.');
  });


  
  socket.on('chat message', (data) => {
    io.emit('chat message', { name: data.name, message: data.message });
  });
});


server.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
});


