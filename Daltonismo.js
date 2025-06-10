// Funções de simulação
function simularProtanopia([r, g, b]) {
  const rp = 0.56667 * r + 0.43333 * g;
  const gp = 0.55833 * r + 0.44167 * g;
  const bp = 0.24167 * g + 0.75833 * b;
  return [Math.round(rp), Math.round(gp), Math.round(bp)];
}

function simularDeuteranopia([r, g, b]) {
  const rp = 0.625 * r + 0.375 * g + 0.0 * b;
  const gp = 0.700 * r + 0.300 * g + 0.0 * b;
  const bp = 0.0 * r + 0.300 * g + 0.700 * b;
  return [Math.round(rp), Math.round(gp), Math.round(bp)];
}

function simularTritanopia([r, g, b]) {
  const rp = 0.950 * r + 0.050 * g + 0.0 * b;
  const gp = 0.0 * r + 0.433 * g + 0.567 * b;
  const bp = 0.0 * r + 0.475 * g + 0.525 * b;
  return [Math.round(rp), Math.round(gp), Math.round(bp)];
}

function simularAcromatopsia([r, g, b]) {
  const cinza = 0.299 * r + 0.587 * g + 0.114 * b;
  return [Math.round(cinza), Math.round(cinza), Math.round(cinza)];
}

// Função genérica para atualizar gradiente com simulação
function atualizarGradienteParaSimulacao(selector, funcSimulacao) {
  const $div = $(selector);
  const estilo = getComputedStyle($div[0]);
  const gradiente = estilo.getPropertyValue('background-image');

  const cores = gradiente.match(/rgb\([^)]+\)/g);
  if (!cores) return;

  const novasCores = cores.map(cor => {
    const [r, g, b] = cor.match(/\d+/g).map(Number);
    const [nr, ng, nb] = funcSimulacao([r, g, b]);
    return `rgb(${nr}, ${ng}, ${nb})`;
  });

  const novoGradiente = `conic-gradient(${novasCores.join(', ')})`;
  $div.css('background-image', novoGradiente);
}

// Guardar gradiente original para cada div (supondo IDs diferentes para cada filtro)
const gradientesOriginais = {
  protanopia: $('#protanopia').css('background-image'),
  deuteranopia: $('#deuteranopia').css('background-image'),
  tritanopia: $('#tritanopia').css('background-image'),
  acromatopsia: $('#acromatopsia').css('background-image')
};

// Estado para cada filtro
const estados = {
  protanopia: false,
  deuteranopia: false,
  tritanopia: false,
  acromatopsia: false
};

// Toggles para cada botão
$('#efeito-protanopia').on('click', function () {
  if (!estados.protanopia) {
    atualizarGradienteParaSimulacao('#protanopia', simularProtanopia);
    estados.protanopia = true;
  } else {
    $('#protanopia').css('background-image', gradientesOriginais.protanopia);
    estados.protanopia = false;
  }
});

$('#efeito-deuteranopia').on('click', function () {
  if (!estados.deuteranopia) {
    atualizarGradienteParaSimulacao('#deuteranopia', simularDeuteranopia);
    estados.deuteranopia = true;
  } else {
    $('#deuteranopia').css('background-image', gradientesOriginais.deuteranopia);
    estados.deuteranopia = false;
  }
});

$('#efeito-tritanopia').on('click', function () {
  if (!estados.tritanopia) {
    atualizarGradienteParaSimulacao('#tritanopia', simularTritanopia);
    estados.tritanopia = true;
  } else {
    $('#tritanopia').css('background-image', gradientesOriginais.tritanopia);
    estados.tritanopia = false;
  }
});

$('#efeito-acromatopsia').on('click', function () {
  if (!estados.acromatopsia) {
    atualizarGradienteParaSimulacao('#acromatopsia', simularAcromatopsia);
    estados.acromatopsia = true;
  } else {
    $('#acromatopsia').css('background-image', gradientesOriginais.acromatopsia);
    estados.acromatopsia = false;
  }
});
