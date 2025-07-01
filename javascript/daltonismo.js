const filtros = ["protanopia", "deuteranopia", "tritanopia", "acromatopsia"];
const elementos = $("body *"); // todos os elementos dentro do body (ajuste se quiser só alguns)

const estados = {
  protanopia: false,
  deuteranopia: false,
  tritanopia: false,
  acromatopsia: false,
};

function aplicarFiltro(idFiltro) {
  elementos.css("filter", `url(#${idFiltro})`);
}

function removerFiltro() {
  elementos.css("filter", "");
}

// Remove todos os filtros e zera estados
function limparFiltros() {
  removerFiltro();
  for (let key in estados) {
    estados[key] = false;
  }
}

function alternarFiltro(idFiltro) {
  if (estados[idFiltro]) {
    // Se filtro ativo, remove ele
    limparFiltros();
  } else {
    // Remove filtro anterior (se houver)
    limparFiltros();
    // Aplica filtro novo
    aplicarFiltro(idFiltro);
    estados[idFiltro] = true;
  }
}

$("#efeito-protanopia").on("click", function () {
  alternarFiltro("protanopia");
});

$("#efeito-deuteranopia").on("click", function () {
  alternarFiltro("deuteranopia");
});

$("#efeito-tritanopia").on("click", function () {
  alternarFiltro("tritanopia");
});

$("#efeito-acromatopsia").on("click", function () {
  alternarFiltro("acromatopsia");
});
