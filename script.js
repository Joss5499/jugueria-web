// Carrusel de imágenes
const imagenes = [
    "img/jugo1.jpg",
    "img/jugo2.jpg",
    "img/jugo3.jpg"
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

// Botón promoción
const boton = document.getElementById("btnPromo");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.textContent = "🎉 ¡Promo! 2x1 en jugo de fresa";
});