document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector("#daltonismo");
  const select = document.querySelector("#tipo_daltonismo");
  // Botão para abrir/fechar menu lateral
  const btnSidebar = document.querySelector("#sidebarToggleBtn");
  if (btnSidebar) {
    btnSidebar.addEventListener("click", function () {
      document.getElementById("simulation-menu").classList.toggle("fechado");
    });
  }

  // Event listeners dos filtros de daltonismo (checkbox e select)


  if (checkbox && select) {
    checkbox.addEventListener("change", function(e) {
      atualizarFiltroDaltonismo();
    });
    select.addEventListener("change", atualizarFiltroDaltonismo);
  }
});

function alternar_menu() {
  const nav = document.getElementById("menu");
  nav.classList.toggle("active");
}

function aplicarFiltro(idFiltro) {
  $("main").css("filter", `url(#${idFiltro})`);
}

function removerFiltro() {
  $("main").css("filter", "");
}

function atualizarFiltroDaltonismo() {
  const ativado = document.querySelector("#daltonismo")?.checked;
  const tipo = document.querySelector("#tipo_daltonismo")?.value;

  if (ativado && tipo) {
    aplicarFiltro(tipo);
  } else {
    removerFiltro();
  }
}
