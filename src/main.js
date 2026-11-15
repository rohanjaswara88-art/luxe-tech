import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const products = [
  {
    id: 'headphones', name: 'Studio Pro', category: 'AUDIO / 01', type: 'Wireless headphones', price: 249,
    description: 'Immersive sound. Thoughtful design. Made for the moments that matter.',
    color: 'Obsidian', colors: ['Obsidian', 'Silver', 'Sand'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85'
    ], tag: 'BESTSELLER'
  },
  {
    id: 'watch', name: 'Time One', category: 'WEARABLES / 02', type: 'Smart watch', price: 319,
    description: 'A calmer way to stay connected, with a clear focus on what matters.',
    color: 'Graphite', colors: ['Graphite', 'Silver', 'Midnight'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=85'
    ], tag: 'NEW ARRIVAL'
  },
  {
    id: 'speaker', name: 'Sound Arc', category: 'HOME AUDIO / 03', type: 'Portable speaker', price: 179,
    description: 'Room-filling sound in a sculptural form that belongs anywhere.',
    color: 'Stone', colors: ['Stone', 'Charcoal', 'Olive'],
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85'
    ], tag: 'DESIGN PICK'
  },
  {
    id: 'graphite-cascade', name: 'GRAPHITE Cascade', category: 'FRAGRANCE / 04', type: 'Eau de Parfum · 50 ml', price: 24,
    description: 'A refined fragrance presented in a charcoal GRAPHITE Cascade carton.',
    color: 'Charcoal', colors: ['Charcoal'],
    images: ['/products/graphite-cascade-front.jpg'], tag: 'NEW OBJECT'
  }
];

const state = { activeProduct: null, frame: 0, zoom: 1, color: '', cart: [], cartOpen: false };
const app = document.querySelector('#app');
const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

function render() {
  app.innerHTML = `
    <header class="topbar">
      <a class="wordmark" href="#top" aria-label="Luxe Tech home">LUXE<span>TECH</span><i>®</i></a>
      <nav class="nav-links" aria-label="Main navigation"><a href="#collection">Collection</a><a href="#philosophy">Our philosophy</a></nav>
      <button class="cart-button" id="cart-open" aria-label="Open shopping bag">BAG <span>${state.cart.reduce((sum, item) => sum + item.qty, 0)}</span></button>
    </header>
    <main id="top">
      <section class="hero">
        <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> TECHNOLOGY, CONSIDERED</p><h1>Less noise.<br><em>More meaning.</em></h1><p class="hero-description">Thoughtful technology for a life well lived. Meet the objects that make every day feel a little more extraordinary.</p><a class="text-link" href="#collection">Explore the collection <span>↘</span></a></div>
        <div class="hero-visual"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><img src="${products[0].images[0]}" alt="Premium headphones"/><span class="hero-index">OBJECT NO. 001 / AUDIO</span><span class="hero-side-note">DESIGNED FOR EVERY DAY</span></div>
        <div class="hero-bottom"><span>DESIGN FIRST. ALWAYS.</span><span>SCROLL TO DISCOVER ↓</span><span>EST. 2026</span></div>
      </section>
      <section class="collection section-wrap" id="collection">
        <div class="section-heading"><div><p class="eyebrow">THE EDIT / 001—003</p><h2>Objects of <em>desire.</em></h2></div><p>Fewer things. Better things.<br>Every detail has a reason.</p></div>
        <div class="product-grid">${products.map((p, i) => `
          <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="Explore ${p.name}">
            <div class="card-image"><span class="product-tag">${p.tag}</span><img src="${p.images[0]}" alt="${p.type}" loading="lazy"><button class="quick-view" data-open="${p.id}" aria-label="Quick view ${p.name}">↗</button><span class="card-number">0${i + 1}</span></div>
            <div class="card-info"><div><p class="eyebrow">${p.category}</p><h3>${p.name}</h3><p class="product-type">${p.type}</p></div><strong>${money(p.price)}</strong></div>
            <button class="view-product" data-open="${p.id}">DISCOVER PRODUCT <span>↗</span></button>
          </article>`).join('')}</div>
      </section>
      <section class="manifesto" id="philosophy"><p class="eyebrow">A DIFFERENT KIND OF TECH</p><h2>Built to be used.<br><em>Made to be kept.</em></h2><p>We believe the best technology earns its place in your life — through considered details, honest materials and experiences that feel effortless.</p><a href="#collection" class="text-link">Find your everyday essential <span>↗</span></a><div class="manifesto-mark">L/T</div></section>
      <footer><a class="wordmark" href="#top">LUXE<span>TECH</span><i>®</i></a><span>© 2026 LUXE TECH — A DEMONSTRATION STORE</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
    <div id="viewer-root"></div><div id="cart-root"></div>
  `;
  app.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); openViewer(btn.dataset.open); }));
  app.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => { if (!e.target.closest('button')) openViewer(card.dataset.product); });
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openViewer(card.dataset.product); } });
  });
  document.querySelector('#cart-open').addEventListener('click', openCart);
}

function openViewer(id) {
  state.activeProduct = products.find(p => p.id === id); state.frame = 0; state.zoom = 1; state.color = state.activeProduct.colors[0];
  renderViewer();
}
function renderViewer() {
  const p = state.activeProduct; if (!p) return;
  const root = document.querySelector('#viewer-root');
  root.innerHTML = `<div class="modal-backdrop" id="viewer-backdrop"><section class="viewer-modal" role="dialog" aria-modal="true" aria-label="${p.name} product viewer">
    <button class="modal-close" id="viewer-close" aria-label="Close product viewer">×</button>
    <div class="viewer-media" id="viewer-media"><div class="viewer-topline"><span>REAL-TIME 3D PRODUCT VIEW</span><span>DRAG TO ROTATE ↔ ↕</span></div><div id="three-stage" aria-label="Interactive 3D model of ${p.name}"></div><div class="viewer-crosshair">+</div><div class="viewer-controls"><button id="zoom-out" aria-label="Zoom out">−</button><span id="zoom-label">100%</span><button id="zoom-in" aria-label="Zoom in">+</button><button id="reset-view" aria-label="Reset view">RESET</button></div><div class="frame-indicator"><span id="model-status">3D MODEL / 360°</span><div class="frame-track"><span style="width:100%"></span></div></div></div>
    <div class="viewer-details"><p class="eyebrow">${p.category} / LIMITED EDITION</p><h2>${p.name}</h2><p class="viewer-type">${p.type}</p><div class="viewer-price">${money(p.price)} <span>USD</span></div><p class="viewer-description">${p.description}</p><div class="detail-divider"></div><div class="color-heading"><span>FINISH</span><span id="selected-color">${state.color}</span></div><div class="color-options">${p.colors.map((c, i) => `<button class="color-option ${i === 0 ? 'selected' : ''}" data-color="${c}" aria-label="${c}" title="${c}"><span style="--swatch:${['#222222','#c8c8c3','#c9bca8'][i % 3]}"></span></button>`).join('')}</div><button class="add-cart" id="add-cart">ADD TO BAG <span>＋</span></button><p class="shipping-note">Complimentary shipping · 30-day returns</p><div class="viewer-tip"><span>↔</span> Drag to rotate horizontally and vertically. Scroll to zoom.</div></div>
  </section></div>`;
  const stage = root.querySelector('#three-stage');
  stage.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:none;';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eeede7');
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.8);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  stage.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;outline:none;';
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07;
  controls.enablePan = false; controls.minDistance = 3.5; controls.maxDistance = 10;
  controls.minPolarAngle = 0.18; controls.maxPolarAngle = Math.PI - 0.18;
  controls.target.set(0, 0, 0); controls.update();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb1a99a, 2.0));
  const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(4, 6, 7); scene.add(key);
  const fill = new THREE.DirectionalLight(0xd9e4ff, 1.5); fill.position.set(-5, 2, 3); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 2.4); rim.position.set(1, 4, -5); scene.add(rim);
  const productGroup = new THREE.Group(); scene.add(productGroup);
  const finishColors = { Obsidian: '#242424', Silver: '#bfc2c2', Sand: '#c6b69e', Graphite: '#383a3d', Midnight: '#171d2a', Stone: '#b9b4a9', Charcoal: '#30302e', Olive: '#6d7258' };
  let currentFinish = state.color;
  const material = (color, metalness = 0.65, roughness = 0.28) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
  const dark = material(finishColors[currentFinish] || '#292929', 0.72, 0.26);
  const metal = material('#bfc0bb', 0.88, 0.2);
  const soft = material('#222321', 0.1, 0.65);
  const screen = new THREE.MeshStandardMaterial({ color: '#101820', metalness: 0.35, roughness: 0.12, emissive: '#172631', emissiveIntensity: 0.22 });
  const addMesh = (geometry, mat, pos, rot) => { const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(...pos); if (rot) mesh.rotation.set(...rot); productGroup.add(mesh); return mesh; };
  const roundedBox = (w,h,d,mat,pos,rot=[0,0,0]) => addMesh(new THREE.BoxGeometry(w,h,d,4,4,2),mat,pos,rot);
  if (p.id === 'graphite-cascade') {
    // Load the supplied textured GLB packaging model and normalize its size/center.
    const loader = new GLTFLoader();
    loader.load('/models/graphite-cascade-box.glb', (gltf) => {
      if (!state.activeProduct || state.activeProduct.id !== 'graphite-cascade') {
        gltf.scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry?.dispose?.();
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.());
            else obj.material?.dispose?.();
          }
        });
        return;
      }
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(2.55 / maxDim);
      const centeredBounds = new THREE.Box3().setFromObject(model);
      const center = centeredBounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
      productGroup.add(model);
    }, undefined, (error) => {
      console.error('Could not load GRAPHITE Cascade model:', error);
      const status = root.querySelector('#model-status');
      if (status) status.textContent = 'MODEL FAILED TO LOAD';
    });
  } else if (p.id === 'headphones') {
    // Headband: a smooth curved tube, plus padded inner band.
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-1.02,0.05,0),new THREE.Vector3(-0.98,0.75,0),new THREE.Vector3(-0.62,1.22,0),new THREE.Vector3(0,1.4,0),new THREE.Vector3(0.62,1.22,0),new THREE.Vector3(0.98,0.75,0),new THREE.Vector3(1.02,0.05,0)]);
    addMesh(new THREE.TubeGeometry(curve, 64, 0.105, 16, false), dark, [0,0,0]);
    const innerCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.85,0.28,0.015),new THREE.Vector3(-0.75,0.79,0.015),new THREE.Vector3(-0.45,1.1,0.015),new THREE.Vector3(0,1.2,0.015),new THREE.Vector3(0.45,1.1,0.015),new THREE.Vector3(0.75,0.79,0.015),new THREE.Vector3(0.85,0.28,0.015)]);
    addMesh(new THREE.TubeGeometry(innerCurve, 48, 0.045, 10, false), soft, [0,0,0]);
    for (const side of [-1,1]) {
      roundedBox(0.18,0.43,0.16,metal,[side*0.96,-0.05,0]);
      addMesh(new THREE.CapsuleGeometry(0.28,0.45,8,16), dark,[side*1.03,-0.43,0],[0,0,side*-0.08]);
      addMesh(new THREE.CylinderGeometry(0.235,0.235,0.075,48), metal,[side*1.03,-0.43,0.17],[Math.PI/2,0,0]);
      addMesh(new THREE.CylinderGeometry(0.205,0.205,0.08,48), dark,[side*1.03,-0.43,0.22],[Math.PI/2,0,0]);
      addMesh(new THREE.TorusGeometry(0.17,0.012,8,48), metal,[side*1.03,-0.43,0.27]);
      addMesh(new THREE.CylinderGeometry(0.15,0.15,0.018,40), soft,[side*1.03,-0.43,0.275],[Math.PI/2,0,0]);
    }
  } else if (p.id === 'watch') {
    // Watch strap above and below the case; the front face points toward the camera.
    roundedBox(0.48,0.88,0.2,dark,[0,1.12,0]);
    roundedBox(0.48,0.88,0.2,dark,[0,-1.12,0]);
    for (let i=0;i<4;i++) roundedBox(0.3,0.045,0.215,metal,[0,1.03+i*0.13,0.12]);
    addMesh(new THREE.BoxGeometry(1.02,1.15,0.26,5,5,2), metal,[0,0,0]);
    addMesh(new THREE.BoxGeometry(0.91,1.04,0.28,5,5,2), dark,[0,0,0.035]);
    addMesh(new THREE.BoxGeometry(0.79,0.91,0.035,4,4,2), screen,[0,0,0.19]);
    addMesh(new THREE.TorusGeometry(0.11,0.035,12,32), metal,[0.54,0.05,0],[0,Math.PI/2,0]);
    // Simple luminous clock marks.
    for (let i=0;i<12;i++) { const a=i*Math.PI/6; roundedBox(0.025,0.09,0.012,metal,[Math.sin(a)*0.31,Math.cos(a)*0.37,0.22],[0,0,-a]); }
    addMesh(new THREE.BoxGeometry(0.025,0.28,0.012), material('#d8dedb',0.35,0.25),[0,0.04,0.235],[0,0,-0.4]);
    addMesh(new THREE.BoxGeometry(0.22,0.025,0.012), material('#d8dedb',0.35,0.25),[0.04,-0.04,0.24],[0,0,0.5]);
  } else {
    // Cylindrical portable speaker with a perforated-looking front grille and end caps.
    addMesh(new THREE.CylinderGeometry(0.72,0.72,2.35,64,1,true), dark,[0,0,0],[0,0,Math.PI/2]);
    addMesh(new THREE.CylinderGeometry(0.72,0.72,0.12,64), metal,[-1.18,0,0],[0,0,Math.PI/2]);
    addMesh(new THREE.CylinderGeometry(0.72,0.72,0.12,64), metal,[1.18,0,0],[0,0,Math.PI/2]);
    addMesh(new THREE.CylinderGeometry(0.65,0.65,0.045,64), soft,[0,0,0.035],[Math.PI/2,0,Math.PI/2]);
    // Front-facing mesh grille and subtle concentric end rings.
    addMesh(new THREE.CylinderGeometry(0.66,0.66,2.1,64,1,true), material(currentFinish === 'Stone' ? '#b7b2a8' : '#343532',0.3,0.72),[0,0,0.02],[0,0,Math.PI/2]);
    addMesh(new THREE.TorusGeometry(0.56,0.018,8,64), metal,[-1.245,0,0],[0,Math.PI/2,0]);
    addMesh(new THREE.TorusGeometry(0.56,0.018,8,64), metal,[1.245,0,0],[0,Math.PI/2,0]);
    for (let x=-0.8;x<=0.81;x+=0.16) for (let y=-0.48;y<=0.49;y+=0.16) { if (x*x+y*y<0.38) addMesh(new THREE.SphereGeometry(0.012,8,8), material('#777870',0.25,0.7),[x,y,0.70]); }
    for (let x=-0.25;x<=0.26;x+=0.25) addMesh(new THREE.BoxGeometry(0.12,0.025,0.025), metal,[x,0.68,0.08]);
  }
  // A subtle studio floor shadow catcher.
  const floor = new THREE.Mesh(new THREE.CircleGeometry(2.3,64), new THREE.ShadowMaterial({ opacity: 0.12 }));
  floor.rotation.x = -Math.PI/2; floor.position.y = -1.65; floor.receiveShadow = true; scene.add(floor);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const resize = () => { const w = Math.max(1, stage.clientWidth), h = Math.max(1, stage.clientHeight); renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix(); };
  const observer = new ResizeObserver(resize); observer.observe(stage); resize();
  let animationId;
  const animate = () => { animationId = requestAnimationFrame(animate); controls.update(); renderer.render(scene,camera); };
  animate();
  const updateZoomLabel = () => { root.querySelector('#zoom-label').textContent = `${Math.round((6.8/camera.position.distanceTo(controls.target))*100)}%`; };
  root.querySelector('#zoom-in').addEventListener('click', () => { camera.position.multiplyScalar(0.88); controls.update(); updateZoomLabel(); });
  root.querySelector('#zoom-out').addEventListener('click', () => { camera.position.multiplyScalar(1.12); controls.update(); updateZoomLabel(); });
  root.querySelector('#reset-view').addEventListener('click', () => { camera.position.set(0,0.15,6.8); controls.target.set(0,0,0); controls.update(); updateZoomLabel(); });
  root.querySelectorAll('[data-color]').forEach(btn => btn.addEventListener('click', () => {
    state.color = btn.dataset.color; currentFinish = state.color;
    root.querySelector('#selected-color').textContent = state.color;
    root.querySelectorAll('[data-color]').forEach(b => b.classList.toggle('selected', b === btn));
    const c = new THREE.Color(finishColors[currentFinish] || '#292929');
    dark.color.copy(c);
    if (p.id === 'speaker') { /* speaker grille remains a contrasting material */ }
  }));
  root.querySelector('#add-cart').addEventListener('click', () => { const found = state.cart.find(item => item.id === p.id && item.color === state.color); if (found) found.qty++; else state.cart.push({ id: p.id, color: state.color, qty: 1 }); cleanup(); closeViewer(); render(); showToast(`${p.name} added to bag`); });
  function cleanup() { cancelAnimationFrame(animationId); observer.disconnect(); controls.dispose(); renderer.dispose(); }
  root.querySelector('#viewer-close').addEventListener('click', () => { cleanup(); closeViewer(); });
  root.querySelector('#viewer-backdrop').addEventListener('click', e => { if (e.target.id === 'viewer-backdrop') { cleanup(); closeViewer(); } });
  document.addEventListener('keydown', handleEscape); document.body.classList.add('modal-open');
  // Stop the render loop when the modal closes through Escape as well.
  root.dataset.cleanup = 'active';
  state.viewerCleanup = cleanup;
}

function closeViewer() { if (state.viewerCleanup) { state.viewerCleanup(); state.viewerCleanup = null; } const root = document.querySelector('#viewer-root'); if (root) root.innerHTML = ''; state.activeProduct = null; document.body.classList.remove('modal-open'); document.removeEventListener('keydown', handleEscape); }
function handleEscape(e) { if (e.key === 'Escape') { closeViewer(); closeCart(); } }
function openCart() {
  const root = document.querySelector('#cart-root'); root.innerHTML = `<div class="cart-backdrop" id="cart-backdrop"><aside class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag"><div class="cart-header"><div><p class="eyebrow">YOUR SELECTION</p><h2>Shopping bag <span>(${state.cart.reduce((s, i) => s + i.qty, 0)})</span></h2></div><button class="modal-close" id="cart-close" aria-label="Close bag">×</button></div><div class="cart-items">${state.cart.length ? state.cart.map(item => { const p = products.find(x => x.id === item.id); return `<div class="cart-item"><img src="${p.images[0]}" alt="${p.name}"><div class="cart-item-info"><h3>${p.name}</h3><p>${item.color}</p><strong>${money(p.price)}</strong><div class="qty-controls"><button data-qty="-1" data-id="${p.id}" data-color="${item.color}">−</button><span>${item.qty}</span><button data-qty="1" data-id="${p.id}" data-color="${item.color}">+</button><button class="remove-item" data-remove="${p.id}" data-color="${item.color}">Remove</button></div></div></div>`; }).join('') : '<div class="empty-cart"><span>○</span><h3>Your bag is taking a moment.</h3><p>Discover something worth keeping.</p></div>'}</div><div class="cart-footer"><div class="subtotal"><span>SUBTOTAL</span><strong>${money(state.cart.reduce((s, item) => s + products.find(p => p.id === item.id).price * item.qty, 0))}</strong></div><p>Shipping and taxes calculated at checkout.</p><button class="add-cart" id="checkout-button" ${state.cart.length ? '' : 'disabled'}>CONTINUE TO CHECKOUT <span>↗</span></button><p class="demo-note">Demo only — checkout is not connected.</p></div></aside></div>`;
  root.querySelector('#cart-close').addEventListener('click', closeCart); root.querySelector('#cart-backdrop').addEventListener('click', e => { if (e.target.id === 'cart-backdrop') closeCart(); });
  root.querySelectorAll('[data-qty]').forEach(btn => btn.addEventListener('click', () => { const item = state.cart.find(i => i.id === btn.dataset.id && i.color === btn.dataset.color); if (item) item.qty = Math.max(0, item.qty + Number(btn.dataset.qty)); state.cart = state.cart.filter(i => i.qty > 0); openCart(); render(); }));
  root.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { state.cart = state.cart.filter(i => !(i.id === btn.dataset.remove && i.color === btn.dataset.color)); openCart(); render(); }));
  root.querySelector('#checkout-button')?.addEventListener('click', () => showToast('Checkout is a demo — connect a payment provider to accept orders.'));
  document.body.classList.add('modal-open');
}
function closeCart() { const root = document.querySelector('#cart-root'); if (root) root.innerHTML = ''; document.body.classList.remove('modal-open'); }
function showToast(message) { const old = document.querySelector('.toast'); old?.remove(); const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; document.body.append(el); setTimeout(() => el.remove(), 2600); }
render();
