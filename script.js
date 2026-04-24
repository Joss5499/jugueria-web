
// =======================
// CARRUSEL DE IMÁGENES
// =======================

const imagenes = [
    "img/jugo1.png",
    "img/jugo2.png",
    "img/jugo3.png"
];

let index = 0;

const img = document.getElementById("imagenCarrusel");

function mostrar() {
    img.src = imagenes[index];
}

function siguiente() {
    index = (index + 1) % imagenes.length;
    mostrar();
}

function anterior() {
    index = (index - 1 + imagenes.length) % imagenes.length;
    mostrar();
}

// automático cada 3 segundos
setInterval(siguiente, 3000);


// =======================
// PROMOCIONES DINÁMICAS
// =======================

const promos = [
    "🔥 2x1 en jugo de fresa",
    "🍊 20% en jugo de naranja",
    "🥬 Detox verde con descuento",
    "🍹 Combo especial hoy"
];

document.getElementById("btnPromo").addEventListener("click", () => {
    let random = Math.floor(Math.random() * promos.length);
    document.getElementById("mensaje").textContent = promos[random];
});


// =======================
// EFECTO VISUAL EN CARDS
// =======================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";
        card.style.boxShadow = "0px 10px 20px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "none";
    });
});


// =======================
// MENSAJE DE BIENVENIDA
// =======================

window.addEventListener("load", () => {
    setTimeout(() => {
        alert("🍹 Bienvenido a Fresh Juice");
    }, 500);
});


// =======================
// CLICK EN PRODUCTOS (INTERACCIÓN)
// =======================

cards.forEach(card => {
    card.addEventListener("click", () => {
        let nombre = card.querySelector("h3").textContent;
        alert("Has seleccionado: " + nombre);
    });
});