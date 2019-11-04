const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


const jogo = {
    configuracoes: {
        corFrutinha: 'green',
        corJogadores: 'black',
        tamanhoObjs: { width: 10, height: 10 }
    },
    jogadores: [],
    // {
    // jogador1: {
    //     cordenadas: { x: 10, y: 30 },
    //     pontuacao: 0,
    //     keyIo: 'xxyz'
    // }
    // },
    frutinhas: {
        frutinha1: { x: 10, y: 50 }
    }
}


io.on('connection', (client) => {

    jogo.jogadores.push({
        id: client.id,
        cordenadas: { x: gerarCordenadas(), y: gerarCordenadas() },
        pontuacao: 0
    });

    io.emit('configuracaoes-jogo', jogo);

    client.on('disconnect', function () {

        jogo.jogadores.forEach((jogador, index) => {

            if (jogador.id == client.id) {
                console.log('Desconectado ' + client.id)

                jogo.jogadores.splice(index)

            }

        });

    });

});


function gerarCordenadas() {
    return Math.round(Math.random() * 499 / 10) * 10;
}

http.listen('8000', function () {
    console.log('Server ligado');
});