/* scripts.js - Updated JavaScript for Hardware Haven Website with enhanced filter functionality and larger modal close buttons */

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
/* Removed duplicate declaration of itemsPerPage */
let filteredProducts = [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
    const cartItemCount = document.getElementById('cart-item-count');
    if (cartItemCount) {
        cartItemCount.textContent = count;
    }
}

// Add to cart
// The existing addToCart function is fine, but ensure it uses the productId correctly
function addToCart(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (!productCard) return;

    const product = {
        id: productId,
        name: productCard.dataset.name,
        price: parseFloat(productCard.dataset.price),
        quantity: 1,
        image: productCard.querySelector('img').src
    };

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!', 'success');
}
    
//     // Show success message
//     showNotification('Product added to cart!', 'success');
// }


// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('Product removed from cart!', 'info');
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('Cart cleared!', 'warning');
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        closeCart();
    } else {
        displayCart();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const grandTotal = document.getElementById('grand-total');
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty. <a href="products.php">Start shopping</a></p></div>';
        if (cartTotal) cartTotal.textContent = '0.00';
        if (grandTotal) grandTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <p class="cart-item-subtotal">₹${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (grandTotal) grandTotal.textContent = total.toFixed(2);
}

// Checkout (placeholder)
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    showNotification('Proceeding to checkout... (Static site - no real payment)', 'info');
    clearCart();
}

// Quick View Modal
// Replace the openModal function in scripts.js
function openModal(name, description, image, price, productId) {
    const modal = document.getElementById('quick-view-modal');
    const modalContent = document.getElementById('modal-content');
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <img src="${image}" alt="${name}" class="modal-product-image">
            <h3>${name}</h3>
            <p class="price">₹${price.toFixed(2)}</p>
            <p>${description}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${productId})">Add to Cart</button>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search functionality
// Replace the performSearch function in scripts.js
function performSearch() {
    const query = document.getElementById('products-search').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    filteredProducts = Array.from(productCards).filter(card => {
        const name = card.dataset.name.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        return name.includes(query) || description.includes(query) || query === '';
    });

    applyFilters(); // This will reapply all filters and render the paginated results
}

// Ensure the search input event listener is active
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    const searchInput = document.getElementById('products-search');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
    // ... existing code ...
});

// Filter functionality
// Replace the applyFilters function in scripts.js
function applyFilters() {
    let tempProducts = [...filteredProducts]; // Start with the initial or searched product set

    const category = document.querySelector('input[name="category"]:checked')?.value || 'all';
    const minPrice = parseFloat(document.getElementById('price-min')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('price-max')?.value) || Infinity;
    const brands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
    const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value) || 0;
    const stock = document.querySelector('input[name="stock"]:checked')?.value || 'all';

    tempProducts = tempProducts.filter(card => {
        const cat = card.dataset.category;
        const price = parseFloat(card.dataset.price) || 0;
        const brand = card.dataset.brand;
        const rating = parseFloat(card.dataset.rating) || 0;
        const productStock = card.dataset.stock;

        const matchesCategory = category === 'all' || cat === category;
        const matchesPrice = price >= minPrice && price <= maxPrice;
        const matchesBrand = brands.length === 0 || brands.includes(brand);
        const matchesRating = rating >= minRating || minRating === 0; // Allow all if no rating filter
        const matchesStock = stock === 'all' || productStock === stock;

        return matchesCategory && matchesPrice && matchesBrand && matchesRating && matchesStock;
    });

    // Update filteredProducts with the final filtered list
    filteredProducts = tempProducts.length > 0 ? tempProducts : Array.from(document.querySelectorAll('.product-card')); // Fallback to all products if none match

    currentPage = 1; // Reset to first page
    applySort(filteredProducts);
    renderProducts();
    updateResultsCount(filteredProducts.length);

    // Debug: Log the number of filtered products
    console.log(`Filtered products count: ${filteredProducts.length}`);
}
function clearFilters() {
    // ... existing reset code ...
    showNotification('Filters cleared! Showing all products.', 'success');
}
function clearFilters() {
    // Reset category radio button to "All Categories"
    document.querySelector('input[name="category"][value="all"]').checked = true;

    // Reset price range inputs
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';

    // Uncheck all brand checkboxes
    document.querySelectorAll('input[name="brand"]').forEach(input => {
        input.checked = false;
    });

    // Reset rating radio button to "All Ratings"
    document.querySelector('input[name="rating"][value="0"]').checked = true;

    // Reset stock status radio button to "All"
    document.querySelector('input[name="stock"][value="all"]').checked = true;

    // Reinitialize filteredProducts with all product cards
    filteredProducts = Array.from(document.querySelectorAll('.product-card'));

    // Reset current page to 1 and reapply filters to refresh the display
    currentPage = 1;
    applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after clearing filters
}


function applySort(products = filteredProducts) {
    const sortValue = document.getElementById('sort-select').value;
    const productsArray = Array.from(products);

    productsArray.sort((a, b) => {
        let aVal, bVal;
        if (sortValue.includes('name')) {
            aVal = a.dataset.name.toLowerCase();
            bVal = b.dataset.name.toLowerCase();
            return sortValue === 'name-asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        } else if (sortValue === 'rating-high') {
            aVal = parseFloat(a.dataset.rating);
            bVal = parseFloat(b.dataset.rating);
            return bVal - aVal;
        } else {
            aVal = parseFloat(a.dataset.price);
            bVal = parseFloat(b.dataset.price);
            return sortValue === 'price-low' ? aVal - bVal : bVal - aVal;
        }
    });

    const container = document.getElementById('products-grid');
    productsArray.forEach(product => container.appendChild(product));
}

function updateResultsCount(count) {
    const resultsElement = document.getElementById('results-count');
    if (resultsElement) {
        resultsElement.textContent = `Showing ${count} products`;
    }
}

// Add this function to scripts.js
function showNoResults() {
    const container = document.getElementById('products-grid');
    if (container && filteredProducts.length === 0) {
        container.innerHTML = '<div class="no-results">No products match your filters. Try adjusting your selections.</div>';
    }
}

// Update renderProducts in scripts.js to call showNoResults
function renderProducts() {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const container = document.getElementById('products-grid');
    if (!container) {
        console.error('Products grid container not found');
        return;
    }
    container.innerHTML = '';

    if (filteredProducts.length > 0) {
        // Show only the current page's products
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const productsToShow = filteredProducts.slice(start, end);
        productsToShow.forEach(product => {
            product.style.display = '';
            container.appendChild(product.cloneNode(true));
        });
    } else {
        showNoResults();
    }

    // Update page info
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Update button states
    const prevBtn = document.querySelector('.products-pagination .pagination-btn:first-child');
    const nextBtn = document.querySelector('.products-pagination .pagination-btn:last-child');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
}

function toggleView(view) {
    const grid = document.getElementById('products-grid');
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    if (view === 'grid') {
        grid.classList.remove('list-view');
        gridView.classList.add('active');
        listView.classList.remove('active');
    } else {
        grid.classList.add('list-view');
        listView.classList.add('active');
        gridView.classList.remove('active');
    }
}

// In scripts.js, remove or comment out the entire duplicate "Pagination functions" section starting from:
// // Pagination functions
// // Pagination variables
// let currentPage = 1;
// const itemsPerPage = 6; ...
// up to the end of the initial render DOMContentLoaded listener for pagination.
// This duplicate is overriding the actual products with sample data.

// At the top of scripts.js, adjust itemsPerPage to match your desired value (e.g., for 35 products, 12 per page gives ~3 pages):
const itemsPerPage = 12;

// In the applyFilters function (already in scripts.js), ensure it calls renderProducts() after setting filteredProducts and applying sort.
// It should already do this based on your file.

// Add or replace the renderProducts, prevPage, and nextPage functions in scripts.js (after the applyFilters definition):
function renderProducts() {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Hide all product cards first
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'none';
    });

    // Show only the current page's products
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = filteredProducts.slice(start, end);
    productsToShow.forEach(product => {
        product.style.display = '';
    });

    // Update page info
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Update button states (using class selectors since no IDs)
    const prevBtn = document.querySelector('.products-pagination .pagination-btn:first-child');
    const nextBtn = document.querySelector('.products-pagination .pagination-btn:last-child');
    if (prevBtn) prevBtn.disabled = (currentPage === 1);
    if (nextBtn) nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    }
}

// In the DOMContentLoaded listener in scripts.js, ensure initial setup:
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Initialize products if on products page
    if (document.querySelector('.products')) {
        filteredProducts = Array.from(document.querySelectorAll('.product-card'));
        applyFilters();
    }
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Add event listener for header search button across all pages
    const searchButton = document.querySelector('header .search-bar button');
    const searchInput = document.getElementById('search-input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearchRedirect);
    }

    // Optional: Add event listener for Enter key press on search input
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearchRedirect();
            }
        });
    }
});

// New function to handle search redirect
function performSearchRedirect() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `products.php?search=${encodeURIComponent(query)}`;
    } else {
        window.location.href = 'products.php'; // Redirect to products page without filter if empty
    }
}

// // New function to handle header search
// function performSearchFromHeader() {
//     const query = document.getElementById('search-input').value.toLowerCase();
//     const productCards = document.querySelectorAll('.product-card');

//     filteredProducts = Array.from(productCards).filter(card => {
//         const name = card.dataset.name.toLowerCase();
//         const description = card.querySelector('p').textContent.toLowerCase();
//         return name.includes(query) || description.includes(query) || query === '';
//     });

//     applyFilters(); // Reapply filters and render paginated results
// }

// Contact form handling
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (validateContactForm(data)) {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
}

function validateContactForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    return true;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Initialize products if on products page
    if (document.querySelector('.products')) {
        filteredProducts = Array.from(document.querySelectorAll('.product-card'));
        applyFilters();
    }
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#2c3e50';
        navbar.style.backdropFilter = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
        closeModal();
    }
});