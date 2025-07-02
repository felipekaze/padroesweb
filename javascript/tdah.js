let simulacaoAtiva = false;
let elementosDistracao = [];

let audioInicio = new Audio("inicio.mp3");
let audioDistracao = new Audio("distracao.mp3");
let audioFim = new Audio("fim.mp3");
let audioFundo = new Audio("fundo.mp3");

audioFundo.loop = true;
audioFundo.volume = 0.4;

let audios = [audioInicio, audioDistracao, audioFim, audioFundo];
for (let i = 0; i < audios.length; i++) {
  audios[i].addEventListener('error', function () {
    console.warn("erro ao carregar audio: " + this.src);
  });
}

function simularTDAH() {
  if (simulacaoAtiva) {
    return;
  }
  simulacaoAtiva = true;
  document.getElementById("mensagemSimulacao").textContent = "simulacao em andamento...";

  audioInicio.play().catch(function () {});

  if (audioFundo.paused) {
    audioFundo.play().catch(function () {});
  }

  let mensagens = [
    "Olha ali!",
    "Foco!",
    "To aqui.",
    "Ei!",
    "Presta atenção!",
    "Concentra!"
  ];

  let intervalID = setInterval(function () {
    if (!simulacaoAtiva) {
      clearInterval(intervalID);
      return;
    }

    let index = Math.floor(Math.random() * mensagens.length);
    let div = document.createElement("div");
    div.textContent = mensagens[index];

    div.style.position = "fixed";
    div.style.padding = "8px 12px";
    div.style.backgroundColor = "#fffa65";
    div.style.border = "1px solid #999";
    div.style.borderRadius = "8px";
    div.style.fontWeight = "bold";
    div.style.color = "#222";
    div.style.top = (Math.random() * 80 + 5) + "%";
    div.style.left = (Math.random() * 80 + 5) + "%";
    div.style.zIndex = "1000";
    div.style.boxShadow = "2px 2px 8px rgba(0,0,0,0.3)";
    div.style.transition = "opacity 0.3s ease-in-out";

    document.body.appendChild(div);
    elementosDistracao.push(div);

    audioDistracao.currentTime = 0;
    audioDistracao.play().catch(function () {});

    setTimeout(function () {
      div.style.opacity = "0";
      setTimeout(function () {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }, 300);
    }, 1000);

    document.body.style.transition = "background-color 0.2s ease";
    document.body.style.backgroundColor = "#f9f871";
    setTimeout(function () {
      document.body.style.backgroundColor = "";
    }, 150);

  }, 800);
}

function pararSimulacao() {
  simulacaoAtiva = false;

  for (let i = 0; i < elementosDistracao.length; i++) {
    let elem = elementosDistracao[i];
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }
  elementosDistracao = [];

  if (!audioFundo.paused) {
    audioFundo.pause();
    audioFundo.currentTime = 0;
  }

  audioFim.play().catch(function () {});

  document.body.style.backgroundColor = "";
  document.getElementById("mensagemSimulacao").textContent = "simulacao encerrada.";
}

// Exponha as funções para serem chamadas do HTML
window.simularTDAH = simularTDAH;
window.pararSimulacao = pararSimulacao;

  document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("tdah");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      simularTDAH();
    } else {
      pararSimulacao();
    }
  });
});
