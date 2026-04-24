// =======================
// CARRUSEL DE IMÁGENES
// =======================

class Carrusel {
    constructor(imagenes, elementoId, intervalo = 3000) {
        this.imagenes = imagenes;
        this.index = 0;
        this.elemento = document.getElementById(elementoId);
        this.intervalo = intervalo;
        this.timer = null;
    }

    mostrar() {
        if (this.elemento) {
            this.elemento.src = this.imagenes[this.index];
        }
    }

    siguiente() {
        this.index = (this.index + 1) % this.imagenes.length;
        this.mostrar();
    }

    anterior() {
        this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
        this.mostrar();
    }

    iniciarAuto() {
        this.detenerAuto();
        this.timer = setInterval(() => this.siguiente(), this.intervalo);
    }

    detenerAuto() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // Método opcional: reanudar auto después de interacción manual
    reiniciarAuto() {
        this.iniciarAuto();
    }
}

// =======================
// PROMOCIONES DINÁMICAS
// =======================

class Promociones {
    constructor(listaPromos, btnId, mensajeId) {
        this.promos = listaPromos;
        this.boton = document.getElementById(btnId);
        this.mensajeElement = document.getElementById(mensajeId);
        this.inicializar();
    }

    seleccionarPromoAleatoria() {
        const random = Math.floor(Math.random() * this.promos.length);
        return this.promos[random];
    }

    mostrarPromo() {
        if (this.mensajeElement) {
            const promo = this.seleccionarPromoAleatoria();
            this.mensajeElement.textContent = promo;
            this.animarMensaje();
        }
    }

    animarMensaje() {
        if (this.mensajeElement) {
            this.mensajeElement.style.animation = 'fadeIn 0.5s ease';
            setTimeout(() => {
                if (this.mensajeElement) {
                    this.mensajeElement.style.animation = '';
                }
            }, 500);
        }
    }

    inicializar() {
        if (this.boton) {
            this.boton.addEventListener('click', () => this.mostrarPromo());
        }
    }
}

// =======================
// EFECTOS EN CARDS
// =======================

class CardEffects {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.inicializar();
    }

    aplicarEfectoHover(card) {
        card.addEventListener('mouseover', () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            card.style.boxShadow = "0px 10px 20px rgba(0,0,0,0.2)";
            card.style.zIndex = "1";
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "none";
            card.style.zIndex = "0";
        });
    }

    inicializar() {
        this.cards.forEach(card => this.aplicarEfectoHover(card));
    }
}

// =======================
// INTERACCIÓN DE PRODUCTOS
// =======================

class ProductosInteractivos {
    constructor(selectorCard) {
        this.cards = document.querySelectorAll(selectorCard);
        this.inicializar();
    }

    obtenerNombreProducto(card) {
        const titulo = card.querySelector('h3');
        return titulo ? titulo.textContent : 'Producto sin nombre';
    }

    manejarClick(card) {
        const nombre = this.obtenerNombreProducto(card);
        // Usar un modal más amigable que alert (opcional)
        this.mostrarNotificacion(`✨ Has seleccionado: ${nombre} ✨`);
    }

    mostrarNotificacion(mensaje) {
        // Mejor que alert para UX
        const notificacion = document.createElement('div');
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notificacion.remove(), 300);
        }, 2500);
    }

    inicializar() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.manejarClick(card));
            // Mejorar accesibilidad
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
        });
    }
}

// =======================
// MENSAJE DE BIENVENIDA
// =======================

class Bienvenida {
    constructor(mensaje, delay = 500) {
        this.mensaje = mensaje;
        this.delay = delay;
    }

    mostrarBienvenida() {
        // Usar notificación personalizada en lugar de alert
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px 40px;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                font-family: Arial, sans-serif;
                animation: fadeInUp 0.4s ease;
            ">
                <h2 style="color: #ff6b6b; margin: 0 0 10px 0;">🍹 ${this.mensaje}</h2>
                <p style="color: #666;">Disfruta de los mejores jugos naturales</p>
                <button id="cerrarBienvenida" style="
                    margin-top: 15px;
                    padding: 8px 20px;
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Cerrar</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
            "></div>
        `;
        
        document.body.appendChild(modal);
        
        const cerrarBtn = document.getElementById('cerrarBienvenida');
        const overlay = modal.querySelector('div:last-child');
        
        const cerrarModal = () => modal.remove();
        cerrarBtn.addEventListener('click', cerrarModal);
        overlay.addEventListener('click', cerrarModal);
    }

    inicializar() {
        setTimeout(() => this.mostrarBienvenida(), this.delay);
    }
}

// =======================
// INICIALIZACIÓN PRINCIPAL
// =======================

// Agregar animaciones CSS si no existen
const agregarAnimacionesCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        .card {
            cursor: pointer;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
};

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Agregar animaciones
    agregarAnimacionesCSS();
    
    // Datos
    const imagenesCarrusel = [
        "img/jugo1.png",
        "img/jugo2.png",
        "img/jugo3.png"
    ];
    
    const promosLista = [
        "🔥 2x1 en jugo de fresa",
        "🍊 20% OFF en jugo de naranja",
        "🥬 Detox verde con 30% descuento",
        "🍹 Combo especial: 3 jugos por S/30",
        "💚 Verde natural + Shot de jengibre gratis"
    ];
    
    // Inicializar componentes
    const carrusel = new Carrusel(imagenesCarrusel, "imagenCarrusel", 3000);
    carrusel.mostrar();
    carrusel.iniciarAuto();
    
    // Pausar carrusel al hacer hover (mejora UX)
    const imgCarrusel = document.getElementById("imagenCarrusel");
    if (imgCarrusel) {
        imgCarrusel.addEventListener('mouseenter', () => carrusel.detenerAuto());
        imgCarrusel.addEventListener('mouseleave', () => carrusel.iniciarAuto());
    }
    
    // Inicializar otros componentes
    const promociones = new Promociones(promosLista, "btnPromo", "mensaje");
    const efectosCards = new CardEffects(".card");
    const productos = new ProductosInteractivos(".card");
    const bienvenida = new Bienvenida("Fresh Juice", 500);
    bienvenida.inicializar();
});

// Exponer funciones para controles manuales (opcional)
window.controlCarrusel = {
    siguiente: () => {
        if (window.carruselInstance) window.carruselInstance.siguiente();
    },
    anterior: () => {
        if (window.carruselInstance) window.carruselInstance.anterior();
    }
};