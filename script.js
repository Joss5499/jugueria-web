// ===== NOTIFICACIONES =====
function notif(msg, tipo='success', icono='✅'){
  const n=document.createElement('div');
  n.className=`notif ${tipo}`;
  n.innerHTML=`<span class="notif-icon">${icono}</span><span>${msg}</span>`;
  document.body.appendChild(n);
  requestAnimationFrame(()=>requestAnimationFrame(()=>n.classList.add('show')));
  setTimeout(()=>{n.classList.remove('show');setTimeout(()=>n.remove(),350)},2800);
}

// ===== CARRITO =====
let carrito=[];

function abrirCarrito(){
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function cerrarCarrito(){
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow='';
}

function actualizarCarrito(){
  const itemsDiv=document.getElementById('cartItems');
  const footer=document.getElementById('cartFooter');
  const emptyDiv=document.getElementById('cartEmpty');
  const countEl=document.getElementById('cartCount');

  const total=carrito.reduce((s,i)=>s+i.precio*i.qty,0);
  const totalItems=carrito.reduce((s,i)=>s+i.qty,0);

  // Count badge
  if(totalItems>0){
    countEl.textContent=totalItems;
    countEl.classList.add('visible');
  } else {
    countEl.classList.remove('visible');
  }

  if(carrito.length===0){
    emptyDiv.style.display='flex';
    footer.style.display='none';
    // Limpiar items excepto el empty
    Array.from(itemsDiv.querySelectorAll('.cart-item')).forEach(el=>el.remove());
    return;
  }

  emptyDiv.style.display='none';
  footer.style.display='block';

  // Limpiar y re-renderizar
  Array.from(itemsDiv.querySelectorAll('.cart-item')).forEach(el=>el.remove());

  carrito.forEach((item,idx)=>{
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <img class="cart-item-img" src="${item.img}" alt="${item.nombre}" onerror="this.style.display='none'"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">S/ ${(item.precio*item.qty).toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-idx="${idx}" data-action="minus">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-idx="${idx}" data-action="plus">+</button>
          <button class="cart-item-remove" data-idx="${idx}" data-action="remove">Eliminar</button>
        </div>
      </div>
    `;
    itemsDiv.appendChild(div);
  });

  document.getElementById('cartSubtotal').textContent=`S/ ${total.toFixed(2)}`;
  document.getElementById('cartTotal').textContent=`S/ ${total.toFixed(2)}`;
}

function agregarAlCarrito(nombre,precio,img){
  const idx=carrito.findIndex(i=>i.nombre===nombre);
  if(idx>=0){
    carrito[idx].qty++;
  } else {
    carrito.push({nombre,precio,img,qty:1});
  }
  actualizarCarrito();
  notif(`¡${nombre} añadido al carrito!`,'success','🥤');
}

// Delegación de eventos en el carrito
document.getElementById('cartItems').addEventListener('click',e=>{
  const btn=e.target.closest('[data-action]');
  if(!btn)return;
  const idx=parseInt(btn.dataset.idx);
  const action=btn.dataset.action;
  if(action==='plus') carrito[idx].qty++;
  else if(action==='minus'){
    carrito[idx].qty--;
    if(carrito[idx].qty<=0) carrito.splice(idx,1);
  } else if(action==='remove'){
    carrito.splice(idx,1);
  }
  actualizarCarrito();
});

document.getElementById('cartBtn').addEventListener('click',abrirCarrito);
document.getElementById('cartClose').addEventListener('click',cerrarCarrito);
document.getElementById('cartOverlay').addEventListener('click',cerrarCarrito);

document.getElementById('btnClearCart').addEventListener('click',()=>{
  carrito=[];
  actualizarCarrito();
  notif('Carrito vaciado','error','🗑️');
});

document.getElementById('btnCheckout').addEventListener('click',()=>{
  if(carrito.length===0)return;
  const total=carrito.reduce((s,i)=>s+i.precio*i.qty,0);
  carrito=[];
  actualizarCarrito();
  cerrarCarrito();
  notif(`¡Pedido realizado! Total: S/ ${total.toFixed(2)} 🎉`,'success','🍹');
});

// Botones "Agregar" en cards
document.querySelectorAll('.card').forEach(card=>{
  const btn=card.querySelector('.add-btn');
  if(!btn)return;
  const nombre=card.dataset.name;
  const precio=parseFloat(card.dataset.price);
  const img=card.dataset.img||'';
  btn.addEventListener('click',(e)=>{
    e.stopPropagation();
    agregarAlCarrito(nombre,precio,img);
    btn.textContent='✓ Agregado';
    btn.classList.add('added');
    setTimeout(()=>{btn.textContent='+ Agregar';btn.classList.remove('added')},1500);
  });
});

// ===== HEADER SCROLL =====
const header=document.getElementById('header');
const actualizarHeader=()=>header.classList.toggle('scrolled',window.scrollY>24);
window.addEventListener('scroll',actualizarHeader);
actualizarHeader();

// ===== BURGER =====
const burger=document.getElementById('burger');
const mobileMenu=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{
  const open=burger.classList.toggle('open');
  mobileMenu.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open?'true':'false');
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
}));

// ===== CURSOR =====
if(window.matchMedia('(min-width:769px)').matches){
  const cur=document.getElementById('cursor');
  const dot=document.getElementById('cursorDot');
  if(cur&&dot){
    document.addEventListener('mousemove',e=>{
      cur.style.transform=`translate(${e.clientX-20}px,${e.clientY-20}px)`;
      dot.style.transform=`translate(${e.clientX-4}px,${e.clientY-4}px)`;
    });
    document.querySelectorAll('a,button,.card').forEach(el=>{
      el.addEventListener('mouseenter',()=>cur.classList.add('big'));
      el.addEventListener('mouseleave',()=>cur.classList.remove('big'));
    });
  }
}

// ===== CARRUSEL =====
class Carrusel{
  constructor({slideSelector,dotSelector,prevId,nextId,interval=4500}){
    this.slides=Array.from(document.querySelectorAll(slideSelector));
    this.dots=Array.from(document.querySelectorAll(dotSelector));
    this.prev=document.getElementById(prevId);
    this.next=document.getElementById(nextId);
    this.idx=0;this.timer=null;this.interval=interval;
    this.init();
  }
  init(){if(!this.slides.length)return;this.goTo(0);this.bindEvents();this.startAuto();}
  bindEvents(){
    if(this.prev)this.prev.addEventListener('click',()=>this.previous());
    if(this.next)this.next.addEventListener('click',()=>this.next2());
    this.dots.forEach((d,i)=>d.addEventListener('click',()=>this.goTo(i)));
    const w=document.querySelector('.carrusel-wrap');
    if(w){w.addEventListener('mouseenter',()=>this.stopAuto());w.addEventListener('mouseleave',()=>this.startAuto());}
  }
  goTo(i){
    this.idx=(i+this.slides.length)%this.slides.length;
    this.slides.forEach((s,j)=>s.classList.toggle('active',j===this.idx));
    this.dots.forEach((d,j)=>d.classList.toggle('active',j===this.idx));
  }
  next2(){this.goTo(this.idx+1);}
  previous(){this.goTo(this.idx-1);}
  startAuto(){this.stopAuto();this.timer=setInterval(()=>this.next2(),this.interval);}
  stopAuto(){if(this.timer){clearInterval(this.timer);this.timer=null;}}
}
new Carrusel({slideSelector:'.slide-item',dotSelector:'.dot',prevId:'btnPrev',nextId:'btnNext',interval:4500});

// ===== PROMOCIONES =====
const promos=[
  '🔥 2x1 en jugo de fresa · Solo hoy',
  '🍊 20% OFF en Naranja Pura · Código: FRESCO',
  '🥬 Verde Detox con 30% descuento · Fin de semana',
  '🍹 Combo: 3 jugos por S/ 28 · Oferta limitada',
  '💚 Verde natural + Shot de jengibre gratis',
  '🎉 Envío gratis en pedidos mayores a S/ 30'
];
document.getElementById('btnPromo').addEventListener('click',()=>{
  const msg=document.getElementById('mensaje');
  msg.style.opacity='0';
  setTimeout(()=>{
    msg.textContent=promos[Math.floor(Math.random()*promos.length)];
    msg.style.opacity='1';
  },200);
  msg.style.transition='opacity .2s';
});

// ===== REVEAL =====
const ro=new IntersectionObserver((entries,obs)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
},{rootMargin:'0px 0px -10% 0px',threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ===== NEWSLETTER =====
document.getElementById('nlBtn').addEventListener('click',()=>{
  const inp=document.getElementById('nlEmail');
  const correo=inp.value.trim();
  if(!/^\S+@\S+\.\S+$/.test(correo)){
    notif('Ingresa un correo válido para suscribirte.','error','⚠️');
    inp.focus();return;
  }
  notif(`¡Listo! Recibirás ofertas en ${correo}`,'success','🎉');
  inp.value='';
});

// ===== BIENVENIDA =====
setTimeout(()=>{
  const ov=document.createElement('div');
  ov.className='welcome-overlay';
  ov.innerHTML=`
    <div class="welcome-box">
      <span class="welcome-emoji">🍹</span>
      <h2>¡Bienvenido a FreshJuice!</h2>
      <span class="badge-promo">🎁 15% OFF en tu primer pedido</span>
      <p>Los jugos más frescos de Lima, directamente a tu puerta en 30 minutos. Sin azúcar, sin conservantes, pura naturaleza.</p>
      <button class="welcome-close" id="welcomeClose">¡Empezar a pedir!</button>
    </div>
  `;
  document.body.appendChild(ov);
  document.getElementById('welcomeClose').addEventListener('click',()=>{
    ov.style.opacity='0';
    ov.style.transition='opacity .3s';
    setTimeout(()=>ov.remove(),300);
  });
  ov.addEventListener('click',e=>{
    if(e.target===ov){ov.style.opacity='0';ov.style.transition='opacity .3s';setTimeout(()=>ov.remove(),300);}
  });
},600);