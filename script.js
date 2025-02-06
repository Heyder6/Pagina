// Carrito y productos
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
  { id: 1, name: 'Camisa Elegante', price: 25, image: 'camisa1.jpg', description: 'Camisa formal 100% algodón' },
  { id: 2, name: 'Camisa Casual', price: 20, image: 'camisa2.jpg', description: 'Estilo urbano moderno' },
  // Agrega más productos según sea necesario
];

// Funciones del carrito
function toggleCart() {
  document.querySelector('.cart-sidebar').classList.toggle('active');
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCart();
}

function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>${item.name} x${item.quantity}</div>
      <div>$${(item.price * item.quantity).toFixed(2)}</div>
      <button onclick="removeItem(${item.id})">🗑️</button>
    </div>
  `).join('');
  
  document.getElementById('total-amount').textContent = 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
}

function addToCart(product, quantity) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Modal de producto
let currentProduct = null;

function openModal(product) {
  currentProduct = product;
  document.querySelector('.product-modal').style.display = 'block';
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('product-quantity').value = 1;
}

function closeModal() {
  document.querySelector('.product-modal').style.display = 'none';
}

function adjustQuantity(change) {
  const input = document.getElementById('product-quantity');
  input.value = Math.max(1, parseInt(input.value) + change);
}

// Generar productos
document.addEventListener('DOMContentLoaded', () => {
  // Generar productos en la página de productos
  if (document.querySelector('.product-grid')) {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = products.map(product => `
      <div class="product-card" onclick="openModal(${JSON.stringify(product).replace(/"/g, '&quot;')})">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `).join('');
  }
  
  updateCart();
});
