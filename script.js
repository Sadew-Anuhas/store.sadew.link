// Products data from localStorage
let products = [];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products from localStorage
function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        // Fallback products if no products in localStorage
        products = [
            {
                id: 1,
                name: "Sample T-Shirt",
                price: 29.99,
                image: "/api/placeholder/400/400",
                description: "Sample product",
                stock: 10
            }
        ];
    }
    renderProducts(); // Render products after loading
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return; // Safety check

    console.log('Products to render:', products); // Debug log

    productsGrid.innerHTML = products.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden product-card">
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-gray-900">$${product.price}</span>
                    <button 
                        onclick="addToCart(${product.id})" 
                        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showNotification('Item added to cart');
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing store...'); // Debug log
    loadProducts();
    updateCartCount();
});

// Add event listener for cart button
document.getElementById('cart-button')?.addEventListener('click', () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('translate-x-full');
});