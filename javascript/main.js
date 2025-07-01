document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".menu-toggle").addEventListener("click", alternar_menu);
    document.querySelector("#toggleMenu").addEventListener('click', () => {
         document.getElementById('sidebar').classList.toggle('fechado') });
} );


function alternar_menu()
{
    const nav = document.getElementById("menu");
    nav.classList.toggle("active");
}