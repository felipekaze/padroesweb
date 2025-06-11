"use strict";

let simulacaoAtiva = false;

function simularTDAH() {
    if (simulacaoAtiva) return;
    simulacaoAtiva = true;

    const mensagens = ["Foco!", "Ei!", "Concentra!", "Olha aqui!"];
    const texto = document.getElementById("mensagemSimulacao");
    if (texto) texto.textContent = "Simulação em andamento...";

    const intervalo = setInterval(() => {
        if (!simulacaoAtiva) {
            clearInterval(intervalo);
            return;
        }

        const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
        const div = document.createElement("div");
        div.textContent = msg;
        Object.assign(div.style, {
            position: "fixed",
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 80 + 5}%`,
            background: "#fffa65",
            padding: "6px 10px",
            borderRadius: "6px",
            fontWeight: "bold",
            zIndex: "999"
        });

        document.body.appendChild(div);

        setTimeout(() => div.remove(), 1000);
    }, 1000);
}

function pararSimulacao() {
    simulacaoAtiva = false;
    const texto = document.getElementById("mensagemSimulacao");
    if (texto) texto.textContent = "Simulação encerrada.";
}
