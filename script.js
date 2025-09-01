// Global variables
let selectedSize = '1kg';
let selectedPrice = 1299;
let quantity = 1;
let currentHoneyType = 'wild';

// Price mapping
const wildHoneyPrices = {
    '500g': 699,
    '1kg': 1299,
    '3kg': 3499,
    '5kg': 5999
};

const normalHoneyPrices = {
    '500g': 499,
    '1kg': 1099,
    '3kg': 3299,
    '5kg': 5799
};

let prices = wildHoneyPrices;

// Global functions for HTML onclick handlers
function orderOnWhatsApp(size) {
    console.log('orderOnWhatsApp called with size:', size);
    const price = prices[size];
    const honeyTypeText = currentHoneyType === 'wild' ? 'Wild Honey (Premium)' : 'Normal Honey';
    const message = `Hi! I'm interested in ordering:

🍯 ${honeyTypeText} from Kashmir Valley
📦 Size: ${size}
💰 Price: ₹${price}

Please let me know about availability and pickup/delivery in Delhi.

Thank you!`;

    const phoneNumber = '917006620509';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
    }
}

function openWhatsApp() {
    console.log('openWhatsApp called');
    const message = `Hi! I'm interested in your Honey from Kashmir Valley.

Could you please share more details about:
- Available honey types (Wild/Normal)
- Available sizes and pricing
- Pickup/delivery options in Delhi
- Product freshness

Thank you!`;

    const phoneNumber = '917006620509';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Update total price
function updateTotal() {
    const total = selectedPrice * quantity;
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = total;
    }
}

// Select size function
function selectSize(size) {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        }
    });
    selectedSize = size;
    selectedPrice = prices[selectedSize];
    updateTotal();
}

// Update price displays
function updatePriceDisplays() {
    document.querySelectorAll('.price-display').forEach((display, index) => {
        const sizes = ['500g', '1kg', '3kg', '5kg'];
        if (display) {
            display.textContent = prices[sizes[index]];
        }
    });

    document.querySelectorAll('.product-price').forEach((el, index) => {
        const sizes = ['500g', '1kg', '3kg', '5kg'];
        if (el) {
            el.textContent = `₹${prices[sizes[index]]}`;
        }
    });
}

// Initialize all functionality
function initializeAll() {
    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Honey type selection
    const honeyTypeBtns = document.querySelectorAll('.honey-type-btn, .honey-type-order-btn');
    honeyTypeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.dataset.type;

            document.querySelectorAll('.honey-type-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.honey-type-order-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.add('active'));

            currentHoneyType = type;
            prices = type === 'wild' ? wildHoneyPrices : normalHoneyPrices;
            updatePriceDisplays();
            selectedPrice = prices[selectedSize];
            updateTotal();
        });
    });

    // Size selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
            selectedPrice = prices[selectedSize];
            updateTotal();
        });
    });

    // Quantity controls
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (quantity > 1) {
                quantity--;
                document.querySelector('.quantity').textContent = quantity;
                updateTotal();
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            quantity++;
            document.querySelector('.quantity').textContent = quantity;
            updateTotal();
        });
    }

    // WhatsApp order button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const total = selectedPrice * quantity;
            const honeyTypeText = currentHoneyType === 'wild' ? 'Wild Honey (Premium)' : 'Normal Honey';
            const message = `Hi! I would like to order:

🍯 ${honeyTypeText} from Kashmir Valley
📦 Size: ${selectedSize}
📦 Quantity: ${quantity}
💰 Total: ₹${total}

Please let me know about pickup/delivery arrangements in Delhi.

Thank you!`;

            const phoneNumber = '917006620509';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            try {
                window.open(whatsappUrl, '_blank');
            } catch (error) {
                window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
            }
        });
    }

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.product-order-btn')) {
                const size = this.dataset.size;
                selectSize(size);
                document.querySelector('#order').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Initialize values
    updateTotal();
    updatePriceDisplays();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAll);

// Initialize when page is fully loaded (fallback)
window.addEventListener('load', initializeAll);
