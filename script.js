const imagenes = [
    "img/jugo1.png",
    "img/jugo2.png",
    "img/jugo3.png"
];

let indice = 0;

function mostrarImagen() {
    document.getElementById("imagenCarrusel").src = imagenes[indice];
}

function siguiente() {
    indice = (indice + 1) % imagenes.length;
    mostrarImagen();
}

function anterior() {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    mostrarImagen();
}

// Auto carrusel
setInterval(siguiente, 3000);

// Botón promo
document.getElementById("btnPromo").addEventListener("click", () => {
    document.getElementById("mensaje").textContent =
        "🎉 Promo activa: 20% de descuento hoy";
});