"use strict";

var simulacaoAtiva = false,
    elementosDistracao = [];

//os audios sao criados fora das funcoes pra nao criar varios 
var audioInicio = new Audio("inicio.mp3");
var audioDistracao = new Audio("distracao.mp3");
var audioFim = new Audio("fim.mp3");
var audioFundo = new Audio("fundo.mp3");

//configura o audio de fundo pra ficar em loop e volume baixo
audioFundo.loop = true;
audioFundo.volume = 0.4;

//aviso de erro caso o arquivo nao carregue
[audioInicio, audioDistracao, audioFim, audioFundo].forEach(audio => {
    audio.addEventListener('error', () => {
        console.warn("erro ao carregar audio: " + audio.src);
    });
});

function simularTDAH() {
    if (simulacaoAtiva) return; // se ja tiver ativo nao faz nada

    simulacaoAtiva = true;
    document.getElementById("mensagemSimulacao").textContent = "simulacao em andamento...";

    //toca som de inicio, ignora erro se nao tocar por causa do navegador
    audioInicio.play().catch(() => {});

    //toca o som de fundo em loop se nao estiver tocando
    if (audioFundo.paused) {
        audioFundo.play().catch(() => {});
    }

    const mensagens = [
        "olha ali!",
        "foco!",
        "to aqui.",
        "ei!",
        "presta atencao!",
        "concentra!"
    ];

    const intervalID = setInterval(() => {
        if (!simulacaoAtiva) {
            clearInterval(intervalID);
            return;
        }

        const index = Math.floor(Math.random() * mensagens.length);
        const div = document.createElement("div");
        div.textContent = mensagens[index];

        //aplica estilo direto na div
        Object.assign(div.style, {
            position: "fixed",
            padding: "8px 12px",
            backgroundColor: "#fffa65",
            border: "1px solid #999",
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#222",
            top: (Math.random() * 80 + 5) + "%",
            left: (Math.random() * 80 + 5) + "%",
            zIndex: "1000",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            transition: "opacity 0.3s ease-in-out"
        });

        document.body.appendChild(div);
        elementosDistracao.push(div);

        //toca som de distracao toda vez que aparece uma mensagem nova
        audioDistracao.currentTime = 0;
        audioDistracao.play().catch(() => {});

        //some a mensagem apos 1 segundo e remove o elemento depois de 300ms
        setTimeout(() => {
            div.style.opacity = "0";
            setTimeout(() => div.remove(), 300);
        }, 1000);

        //efeito rapido no background
        document.body.style.transition = "background-color 0.2s ease";
        document.body.style.backgroundColor = "#f9f871";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 150);

    }, 800);
}

function pararSimulacao() {
    simulacaoAtiva = false;

    //remove todos os elementos de distracao da tela
    elementosDistracao.forEach(elem => elem.remove());
    elementosDistracao = [];

    //para o som de fundo e reseta o tempo
    if (!audioFundo.paused) {
        audioFundo.pause();
        audioFundo.currentTime = 0;
    }

    //toca som de fim da simulacao, ignora erro se nao tocar
    audioFim.play().catch(() => {});

    document.body.style.backgroundColor = "";
    document.getElementById("mensagemSimulacao").textContent = "simulacao encerrada.";
}
