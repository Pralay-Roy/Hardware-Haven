<?php
// about.php - Enhanced About Page with improved design and cart functionality
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Hardware Haven</title>
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

    <main class="about">
        <section class="hero">
            <div class="hero-background"></div>
            <div class="hero-content">
                <h2>About Hardware Haven</h2>
                <p>Discover our story, vision, and the team behind your favorite hardware store.</p>
                <div class="hero-buttons">
                    <a href="products.php" class="cta-button primary">Shop Now</a>
                    <a href="contact.php" class="cta-button secondary">Contact Us</a>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="about-content">
                <div class="about-section">
                    <h3><i class="fas fa-history"></i> Our History</h3>
                    <p>Founded in 2005 by local entrepreneur Mr. John Smith, Hardware Haven started as a modest 500 sq ft store offering basic tools and fasteners. What began as a passion for helping the community with their building needs has grown into a 5000 sq ft emporium. Over the years, we've weathered economic shifts, expanded our inventory to meet the evolving needs of our customers.</p>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-date">2005</div>
                            <div class="timeline-content">Store founded</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">2012</div>
                            <div class="timeline-content">First expansion</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">2015</div>
                            <div class="timeline-content">Power tools introduced</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">2020</div>
                            <div class="timeline-content">Custom services added</div>
                        </div>
                    </div>
                </div>

                <div class="about-section">
                    <h3><i class="fas fa-eye"></i> Our Vision</h3>
                    <p>We aim to be the go-to destination for quality hardware at affordable prices, fostering a community where DIY enthusiasts and professionals alike can thrive. Our vision is to empower every project with reliable tools and supplies.</p>
                    <ul class="vision-list">
                        <li>Provide top-quality products at fair prices</li>
                        <li>Foster a knowledgeable and friendly team</li>
                        <li>Support local initiatives and sustainability</li>
                        <li>Expand services to meet evolving customer needs</li>
                    </ul>
                </div>

                <div class="about-section">
                    <h3><i class="fas fa-cogs"></i> Our Services</h3>
                    <p>Beyond our extensive product range, we offer expert advice, custom cutting services for materials like wood and metal, key duplication, and basic tool rentals. Our knowledgeable staff is always ready to assist.</p>
                    <div class="services-grid">
                        <div class="service-card">
                            <i class="fas fa-user-cog"></i>
                            <h4>Expert Advice</h4>
                            <p>Free consultations with experienced staff on tool selection and project planning.</p>
                        </div>
                        <div class="service-card">
                            <i class="fas fa-cut"></i>
                            <h4>Custom Cutting</h4>
                            <p>Precision cutting for wood, metal, and pipes to your exact specifications.</p>
                        </div>
                        <div class="service-card">
                            <i class="fas fa-key"></i>
                            <h4>Key Duplication</h4>
                            <p>Quick and accurate key copying for homes, cars, and businesses.</p>
                        </div>
                        <div class="service-card">
                            <i class="fas fa-tools"></i>
                            <h4>Tool Rentals</h4>
                            <p>Rent specialized tools for short-term projects at affordable rates.</p>
                        </div>
                        <div class="service-card">
                            <i class="fas fa-paint-brush"></i>
                            <h4>Color Matching</h4>
                            <p>Match paints to samples for perfect touch-ups and renovations.</p>
                        </div>
                        <div class="service-card">
                            <i class="fas fa-shipping-fast"></i>
                            <h4>Delivery Services</h4>
                            <p>Convenient delivery options for large or heavy items.</p>
                        </div>
                    </div>
                </div>

                <div class="about-section">
                    <h3><i class="fas fa-users"></i> Meet the Shop Owner</h3>
                    <p>Our dedicated shop owner brings years of experience and passion to Hardware Haven.</p>
                    <div class="team-grid">
                        <div class="team-member">
                            <img src="images/sayan.jpg" alt="Sayan Roy">
                            <h4>Sayan Roy</h4>
                            <p>Owner & Founder<br>8+ years in hardware</p>
                        </div>
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