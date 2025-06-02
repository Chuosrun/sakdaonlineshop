// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.5,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        title: "Smart Watch with Heart Rate Monitor",
        category: "Electronics",
        price: 119.99,
        originalPrice: 149.99,
        rating: 4.2,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        title: "Men's Casual T-Shirt",
        category: "Clothing",
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.0,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 4,
        title: "Women's Running Shoes",
        category: "Clothing",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.7,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 5,
        title: "Stainless Steel Cookware Set",
        category: "Home & Kitchen",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.8,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 6,
        title: "Smart Home Security Camera",
        category: "Electronics",
        price: 149.99,
        originalPrice: 179.99,
        rating: 4.3,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 7,
        title: "Organic Face Moisturizer",
        category: "Beauty",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.6,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 8,
        title: "Luxury Scented Candle Set",
        category: "Home & Kitchen",
        price: 49.99,
        originalPrice: 59.99,
        rating: 4.4,
        image: "https://via.placeholder.com/300x200"
    }
];

// Cart functionality
let cart = [];
let wishlist = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const newsletterForm = document.getElementById('newsletter-form');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Calculate discount percentage
        const discountPercentage = Math.round((product.originalPrice - product.price) / product.originalPrice * 100);
        
        // Create rating stars
        const stars = generateStars(product.rating);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <div class="product-rating">${stars} (${product.rating})</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-id="${product.id}"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to buttons
    addEventListeners();
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add event listeners to product buttons
function addEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Add to wishlist buttons
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId);
            
            // Toggle heart icon
            const heartIcon = this.querySelector('i');
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.style.color = '#e91e63';
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.style.color = '';
            }
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`${product.title} added to cart!`);
    }
}

// Toggle product in wishlist
function toggleWishlist(productId) {
    const index = wishlist.findIndex(id => id === productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Product added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Product removed from wishlist!');
    }
}

// Update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    // Add to the DOM
    document.body.appendChild(notification);
    
    // Add visible class after a small delay (for animation)
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        
        // Remove from DOM after fade out animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Handle newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // In a real application, you would send this to a server
        console.log(`Newsletter subscription for: ${email}`);
        
        // Clear the input and show success message
        emailInput.value = '';
        showNotification('Thanks for subscribing to our newsletter!');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
        }
        
        .notification.visible {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}); 