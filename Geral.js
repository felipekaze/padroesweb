document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".menu-toggle").addEventListener("click", alternar_menu);
} );


function alternar_menu()
{
    const nav = document.getElementById("menu");
    nav.classList.toggle("active");
}