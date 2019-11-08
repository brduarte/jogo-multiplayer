const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


const jogo = {
    configuracoes: {
        corFrutinha: '#5b865e',
        tamanhoObjs: { width: 10, height: 10 }
    },
    jogadores: {},
    // {
    // jogador1: {
    //     cordenadas: { x: 10, y: 30 },
    //     pontuacao: 0,
    //     keyIo: 'xxyz'
    //     cor: yello
    // }
    // },
    frutinhas: {
        frutinha1: { x: 10, y: 50 }
    }
}

io.on('connection', (client) => {

    adiconarJogador(client.id);

    io.emit('configuracaoes-jogo', jogo);

    client.on('disconnect', function () {
        removerJogador(client.id);
        atualizarJogadores();
    });

    client.on('movimento-jogador', function (keyCode) {

        let jogador = jogo.jogadores[client.id];
        controle(keyCode, jogador);
        pontuarJogador(jogador);
        atualizarJogadores();

    });

});


function gerarCordenadas() {
    return Math.round(Math.random() * 499 / 10) * 10;
}

function removerJogador(idClient) {
    delete jogo.jogadores[idClient];
}

function adiconarJogador(key) {

    return jogo.jogadores[key] = {
        cordenadas: {
            x: gerarCordenadas(),
            y: gerarCordenadas()
        },
        pontuacao: 0,
        cor: 'rgba(128,128,128,0.5)',
    }

}

function controle(keyCode, jogador) {

    if (jogador.cordenadas.x !== 0 && keyCode === 37) {
        jogador.cordenadas.x -= 10;
        return;
    }

    if (jogador.cordenadas.y !== 0 && keyCode === 38) {
        jogador.cordenadas.y -= 10;
        return;
    }

    if (jogador.cordenadas.x !== 490 && keyCode === 39) {
        jogador.cordenadas.x += 10;
        return;
    }

    if (jogador.cordenadas.y !== 490 && keyCode === 40) {
        jogador.cordenadas.y += 10;
        return;
    }

}

function pontuarJogador(jogador) {

    if (jogador.cordenadas.x === jogo.frutinhas.frutinha1.x && jogador.cordenadas.y === jogo.frutinhas.frutinha1.y) {
        jogador.pontuacao++;
        console.log(jogador.pontuacao);
        jogo.frutinhas.frutinha1 = {
            x: gerarCordenadas(),
            y: gerarCordenadas()
        }
    }

}

function atualizarJogadores() {
    io.emit('atualizar-jogador', jogo.jogadores);
    io.emit('atualizar-frutinha', jogo.frutinhas);
}

http.listen('80', function () {
    console.log('http://localhost');
});