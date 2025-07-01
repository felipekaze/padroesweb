let dislexiaAtiva = false;
let textoOriginal = "";

function embaralharPalavra(palavra) {
  if (palavra.length <= 3) return palavra;

  const inicio = palavra[0];
  const fim = palavra[palavra.length - 1];
  const meio = palavra.slice(1, -1).split('');

  for (let i = meio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [meio[i], meio[j]] = [meio[j], meio[i]];
  }

  return inicio + meio.join('') + fim;
}

function trocarLetrasAleatoriamente(palavra) {
  const trocas = { 'b': 'd', 'd': 'b', 'p': 'q', 'q': 'p', 'm': 'n', 'n': 'm', 'u': 'n' };
  return palavra.split('').map(letra => {
    const min = letra.toLowerCase();
    if (trocas[min] && Math.random() < 0.5) {
      const nova = trocas[min];
      return letra === min ? nova : nova.toUpperCase();
    }
    return letra;
  }).join('');
}

function aplicarEfeitoDislexia(texto) {
  const palavras = texto.split(/\b/); // mantém espaços e pontuação
  return palavras.map(palavra => {
    if (/^\w+$/.test(palavra)) {
      let nova = embaralharPalavra(palavra);
      nova = trocarLetrasAleatoriamente(nova);
      return nova;
    }
    return palavra;
  }).join('');
}

function alternarDislexia() {
  const p = document.getElementById("dislexia-1");
  const botao = document.getElementById("efeito-Visual-Espacial");

  if (!dislexiaAtiva) {
    textoOriginal = p.innerText;
    p.innerText = aplicarEfeitoDislexia(textoOriginal);
    dislexiaAtiva = true;

    p.classList.toggle("shake", dislexiaAtiva);
    botao.innerText = "Desativar efeito de dislexia";
  } else {
    p.innerText = textoOriginal;
    dislexiaAtiva = false;
    p.classList.toggle("shake", dislexiaAtiva);
    botao.innerText = "Ativar efeito de dislexia";
  }
}

// Garante que o botão existe antes de adicionar o evento
document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("efeito-Visual-Espacial");
  if (botao) {
    botao.addEventListener("click", alternarDislexia);
  }
});