const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

io.on('connection', (socket) => {

    // io.emit('msg', 'Um novo jogador entrou'+socket.id);
    socket.broadcast.emit('msg', socket.id);
    socket.broadcast.emit('teste', )


})

http.listen('8000', function () {
    console.log('Server ligado');
});


