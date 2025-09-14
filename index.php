<?php
// index.php - Enhanced Landing Page with improved design and functionality
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hardware Haven - Your Premier Hardware Shop</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo-section">
                    <h1 class="logo">Hardware Haven</h1>
                    <span class="tagline">Tools for Every Project</span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.php"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="about.php"><i class="fas fa-info-circle"></i> About</a></li>
                    <li><a href="products.php"><i class="fas fa-tools"></i> Products</a></li>
                    <li><a href="contact.php"><i class="fas fa-envelope"></i> Contact</a></li>
                </ul>
                <div class="nav-icons">
                    <div class="search-bar">
                        <input type="text" id="search-input" placeholder="Search products...">
                        <button><i class="fas fa-search"></i></button> <!-- No inline onclick -->
                    </div>
                    <a href="#" class="cart-icon" onclick="toggleCart()">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cart-count">0</span>
                    </a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <main class="landing">
        <section class="hero">
            <div class="hero-background"></div>
            <div class="hero-content">
                <h2>Welcome to Hardware Haven</h2>
                <p>Your trusted one-stop shop for all hardware needs in the community. Discover quality tools and supplies for every project.</p>
                <div class="hero-buttons">
                    <a href="products.php" class="cta-button primary">Browse Products</a>
                    <a href="about.php" class="cta-button secondary">Learn More</a>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Why Choose Hardware Haven?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fas fa-truck"></i>
                        <h3>Fast Delivery</h3>
                        <p>Get your orders delivered quickly to your doorstep or pick up in-store.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Quality Guaranteed</h3>
                        <p>All products are sourced from trusted manufacturers for reliability.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-headset"></i>
                        <h3>Expert Advice</h3>
                        <p>Our team is ready to help with any questions or project recommendations.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-rupee-sign"></i>
                        <h3>Affordable Prices</h3>
                        <p>Competitive pricing on all hardware essentials without compromising quality.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="featured-products">
            <div class="container">
                <h2>Featured Products</h2>
                <div class="product-grid">
                    <div class="product-card" data-product-id="101" data-name="Cordless Drill 18V" data-price="7500.00">
                        <img src="images/drill.jpg" alt="Cordless Drill">
                        <div class="product-info">
                            <h4>Cordless Drill</h4>
                            <p class="price">₹7,500.00</p>
                            <p>High-torque cordless drill/driver with 20+ clutch settings.</p>
                            <div class="product-actions">
                                <button class="quick-view-btn" onclick="openModal('Cordless Drill 18V', 'Versatile power tool for drilling and driving. Includes 2 batteries and charger.', 'images/drill.jpg', 7500, 101)">Quick View</button>
                                <button class="add-to-cart-btn" onclick="addToCart(101)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card" data-product-id="102" data-name="Claw Hammer 16oz" data-price="1300.00">
                        <img src="images/hammer.jpg" alt="Claw Hammer">
                        <div class="product-info">
                            <h4>Claw Hammer 16oz</h4>
                            <p class="price">₹1300.00</p>
                            <p>Ergonomic claw hammer with fiberglass handle.</p>
                            <div class="product-actions">
                                <button class="quick-view-btn" onclick="openModal('Claw Hammer 16oz', 'Essential hand tool for carpentry.', 'images/hammer.jpg', 1300.00, 102)">Quick View</button>
                                <button class="add-to-cart-btn" onclick="addToCart(102)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card" data-product-id="136" data-name="LED Bulb 60W" data-price="300.00">
                        <img src="images/LED.jpg" alt="LED Bulb">
                        <div class="product-info">
                            <h4>LED Bulb 60W</h4>
                            <p class="price">₹300.00</p>
                            <p>Energy-efficient A19 LED bulb, 800 lumens.</p>
                            <div class="product-actions">
                                <button class="quick-view-btn" onclick="openModal('LED Bulb 60W', 'Long-lasting light bulb.', 'images/LED.jpg', 300.00, 136)">Quick View</button>
                                <button class="add-to-cart-btn" onclick="addToCart(136)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card" data-product-id="137" data-name="Star Cement 50lb" data-price="1000.00">
                        <img src="images/star-cement.jpg" alt="Star Cement">
                        <div class="product-info">
                            <h4>Star Cement 50lb</h4>
                            <p class="price">₹390.00</p>
                            <p>Premium Star cement for mixing concrete.</p>
                            <div class="product-actions">
                                <button class="quick-view-btn" onclick="openModal('Star Cement 50lb', 'Versatile base for construction mixes.', 'images/star-cement.jpg', 1000.00, 137)">Quick View</button>
                                <button class="add-to-cart-btn" onclick="addToCart(137)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="featured-actions">
                    <a href="products.php" class="cta-button primary">View All Products</a>
                </div>
            </div>
        </section>

        <section class="description">
            <div class="container">
                <h2>About Our Shop</h2>
                <p>Hardware Haven has been serving the local community for over 20 years with quality hardware supplies, tools, and expert advice. We stock everything from basic fasteners to advanced power tools, ensuring you find what you need for your DIY projects or professional work. Our commitment to customer satisfaction drives us to provide the best service possible.</p>
                <div class="description-images">
                    <img src="images/shop-interior.jpg" alt="Shop Interior">
                    <img src="images/tools-display.jpg" alt="Tools Display">
                </div>
            </div>
        </section>

        <section class="testimonials">
            <div class="container">
                <h2>What Our Customers Say</h2>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <i class="fas fa-quote-left"></i>
                        <p>"Great selection of tools and friendly staff. Always find what I need!"</p>
                        <h4>- Dhruba Mandal</h4>
                    </div>
                    <div class="testimonial-card">
                        <i class="fas fa-quote-left"></i>
                        <p>"Affordable prices and quality products. Highly recommend!"</p>
                        <h4>- Masud Alom</h4>
                    </div>
                    <div class="testimonial-card">
                        <i class="fas fa-quote-left"></i>
                        <p>"Expert advice helped with my home renovation project."</p>
                        <h4>- Ajibul Alam</h4>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Cart Modal -->
    <div id="cart-modal" class="modal">
        <div class="cart-modal-content">
            <span class="close" onclick="closeCart()">&times;</span>
            <h2>Your Cart</h2>
            <div id="cart-items" class="cart-items"></div>
            <div class="cart-total">
                <p>Total: ₹<span id="cart-total">0.00</span></p>
            </div>
            <div class="cart-actions">
                <button class="clear-cart" onclick="clearCart()">Clear Cart</button>
                <button class="checkout-btn" onclick="checkout()">Checkout</button>
            </div>
        </div>
    </div>

    <!-- Quick View Modal -->
    <div id="quick-view-modal" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <div id="modal-content" class="modal-body"></div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Hardware Haven</h3>
                    <p>Your local hardware experts since 2005.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="about.php">About</a></li>
                        <li><a href="products.php">Products</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>Dakshin Jharalta<br>Doukimari, Dhupguri<br>Phone: +91 85097 70548</p>
                </div>
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Hardware Haven. All rights reserved. | Designed with care for quality hardware solutions.</p>
            </div>
        </div>
    </footer>

    <script src="scripts.js"></script>
</body>
</html>