let dislexiaAtiva = false;
const textosOriginais = new Map(); // armazena os textos originais por elemento
const tagsPermitidas = ['P', 'SPAN', 'DIV', 'LI', 'A', 'LABEL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];


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
  const trocas = { 'b': 'd', 'd': 'b', 'p': 'q', 'q': 'p', 'm': 'n', 'n': 'm'};
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
  const elementosComTexto = Array.from(document.querySelectorAll(tagsPermitidas.join(','))).filter(el => {
    return (
      el.children.length === 0 && // só elementos sem filhos
      el.textContent.trim().length > 0 // que têm texto visível
    );
  });

  elementosComTexto.forEach(el => {
    if (!dislexiaAtiva) {
      if (!textosOriginais.has(el)) {
        textosOriginais.set(el, el.innerText);
      }
      el.innerText = aplicarEfeitoDislexia(textosOriginais.get(el));
    } else {
      if (textosOriginais.has(el)) {
        el.innerText = textosOriginais.get(el);
      }
    }
  });

  dislexiaAtiva = !dislexiaAtiva;
}


// Garante que o botão existe antes de adicionar o evento
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("dislexia-checkbox");
  checkbox.addEventListener("change", (event) =>
  {
    if (event.target.checked) 
    {
      dislexiaAtiva = false
    } 
    else 
    {
      dislexiaAtiva = true
    }
    alternarDislexia();
  });
});