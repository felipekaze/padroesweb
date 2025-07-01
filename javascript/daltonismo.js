const elementos = $("body *");

function aplicarFiltro(idFiltro) {
  elementos.css("filter", `url(#${idFiltro})`);
}

function removerFiltro() {
  elementos.css("filter", "");
}

function atualizarFiltroDaltonismo() {
  const checkboxAtivado = $("#ativar_daltonismo").is(":checked");
  const tipoDaltonismo = $("#tipo_daltonismo").val();

  if (checkboxAtivado) {
    aplicarFiltro(tipoDaltonismo);
  } else {
    removerFiltro();
  }
}

// Quando a checkbox muda
$("#ativar_daltonismo").on("change", function () {
  atualizarFiltroDaltonismo();
});

// Quando o select muda
$("#tipo_daltonismo").on("change", function () {
  atualizarFiltroDaltonismo();
});
