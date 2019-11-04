input.addEventListener('keydown', function (event) {
    console.log(event.target.value)
});







const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

renderJogo();

document.addEventListener('keydown', function (event) {

    controle(jogo.jogadores.jogador1.cordenadas);
    verificarCordenadasJogadoFrutinha(jogo.jogadores.jogador1);

});

function renderJogo() {

    context.fillStyle = 'white';
    context.fillRect(0, 0, 500, 500);

    for (const idFrutinha in jogo.frutinhas) {
        const frutinha = jogo.frutinhas[idFrutinha];
        context.fillStyle = jogo.configuracoes.corFrutinha;
        context.fillRect(frutinha.x, frutinha.y, jogo.configuracoes.tamanhoObjs.width, jogo.configuracoes.tamanhoObjs.height);
    }

    for (const idJogador in jogo.jogadores) {

        const jogador = jogo.jogadores[idJogador];
        context.fillStyle = jogo.configuracoes.corJogadores;
        context.fillRect(jogador.cordenadas.x, jogador.cordenadas.y, jogo.configuracoes.tamanhoObjs.width, jogo.configuracoes.tamanhoObjs.height);

    }

    requestAnimationFrame(renderJogo);

}


function controle(jogador) {

    const keyCode = event.keyCode

    switch (keyCode) {
        case 37: //esquerda
            jogador.x -= 10
            break;
        case 38: //cima
            jogador.y -= 10
            break;
        case 39: //direita
            jogador.x += 10
            break;
        case 40: //baixo
            jogador.y += 10
            break;
        default:
            break;
    }

}

function verificarCordenadasJogadoFrutinha(jogador) {

    //TODO Implentar direito 
    if (jogador.cordenadas.x == jogo.frutinhas.frutinha1.x && jogador.cordenadas.y == jogo.frutinhas.frutinha1.y) {

        const x = Math.round(Math.random() * 499 / 10) * 10;
        const y = Math.round(Math.random() * 499 / 10) * 10;

        jogo.frutinhas.frutinha1.x = x;
        jogo.frutinhas.frutinha1.y = y;

        jogador.pontuacao += 1;

        console.log(jogador.pontuacao)

    }

}
