document.addEventListener("DOMContentLoaded", function () {

  const btnSidebar = document.querySelector("#sidebarToggleBtn");
  if (btnSidebar) {
    btnSidebar.addEventListener("click", function () {
      document.getElementById("simulation-menu").classList.toggle("fechado");
    });
  }
})
  // Event listeners dos filtros de daltonismo (checkbox e select)
