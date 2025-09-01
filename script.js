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

// Order form functionality
let selectedSize = '1kg';
let selectedPrice = 1299; // Default price for 1kg wild honey
let quantity = 1;

// Price mapping - Updated with actual prices
const wildHoneyPrices = {
    '500g': 699,
    '1kg': 1299,
    '3kg': 3499,
    '5kg': 5999
};

const normalHoneyPrices = {
    '500g': 499,  // 200 less than wild honey
    '1kg': 1099,  // 200 less than wild honey
    '3kg': 3299,  // 200 less than wild honey
    '5kg': 5799   // 200 less than wild honey
};

// Current selection
let currentHoneyType = 'wild'; // 'wild' or 'normal'
let prices = wildHoneyPrices; // Default to wild honey

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
    // Update size buttons with current prices
    document.querySelectorAll('.price-display').forEach((display, index) => {
        const sizes = ['500g', '1kg', '3kg', '5kg'];
        if (display) {
            display.textContent = prices[sizes[index]];
        }
    });

    // Update product cards
    document.querySelectorAll('.product-price').forEach((el, index) => {
        const sizes = ['500g', '1kg', '3kg', '5kg'];
        if (el) {
            el.textContent = `₹${prices[sizes[index]]}`;
        }
    });
}

// Initialize all button functionality
function initializeButtons() {
    // Honey type selection
    const honeyTypeBtns = document.querySelectorAll('.honey-type-btn, .honey-type-order-btn');
    honeyTypeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.dataset.type;
            console.log('Honey type clicked:', type);

            // Update active states
            document.querySelectorAll('.honey-type-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.honey-type-order-btn').forEach(b => b.classList.remove('active'));

            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.add('active'));

            // Update current honey type and prices
            currentHoneyType = type;
            prices = type === 'wild' ? wildHoneyPrices : normalHoneyPrices;

            // Update price displays
            updatePriceDisplays();

            // Update selected price
            selectedPrice = prices[selectedSize];
            updateTotal();
        });
    });

    // Size selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Size button clicked:', this.dataset.size);
            
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

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only scroll to order section if not clicking the order button
            if (!e.target.closest('.product-order-btn')) {
                const size = this.dataset.size;
                selectSize(size);
                document.querySelector('#order').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// WhatsApp order functionality
function initWhatsAppButton() {
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
            
            // Try to open WhatsApp, fallback to web version
            try {
                window.open(whatsappUrl, '_blank');
            } catch (error) {
                console.log('Opening WhatsApp web...');
                window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
            }
        });
    }
}

// Direct WhatsApp functions for product cards and general contact
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

    console.log('Opening WhatsApp URL:', whatsappUrl);
    
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.log('Fallback to WhatsApp Web');
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

    console.log('Opening general WhatsApp URL:', whatsappUrl);
    
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.log('Fallback to WhatsApp Web');
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add floating animation to hero elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.bee');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Add some interactive effects
document.querySelectorAll('.cta-button, .whatsapp-order-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.querySelectorAll('.cta-button, .whatsapp-order-btn, .size-btn, .product-order-btn, .direct-whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add parallax effect to hero section (fixed deprecated pageYOffset)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Add scroll-triggered animations for new sections
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe new elements
document.querySelectorAll('.benefit-card, .testimonial-card, .order-step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    animateOnScroll.observe(el);
});

// Add staggered animation for benefits
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add staggered animation for testimonials
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Add staggered animation for order steps
document.querySelectorAll('.order-step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Enhanced mobile touch interactions
function addMobileTouchEffects() {
    // Add touch feedback for buttons
    const touchElements = document.querySelectorAll('.product-order-btn, .whatsapp-order-btn, .cta-button, .direct-whatsapp-btn, .size-btn');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 100);
        });
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Add touch effects
        addMobileTouchEffects();
        
        // Prevent zoom on double tap for buttons
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Optimize viewport for mobile
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
}

// Add mobile-specific CSS
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    /* Mobile-specific styles */
    .mobile-device .product-card:active {
        transform: scale(0.98) !important;
    }
    
    .mobile-device .benefit-card:active,
    .mobile-device .testimonial-card:active {
        transform: scale(0.98) !important;
    }
    
    /* Smooth scrolling for mobile */
    @media (max-width: 768px) {
        html {
            scroll-behavior: smooth;
        }
        
        /* Larger tap targets */
        .faq-question {
            min-height: 60px;
            display: flex;
            align-items: center;
        }
        
        .qty-btn {
            min-height: 50px;
            min-width: 50px;
        }
        
        /* Better spacing for mobile */
        .trust-badges {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .badge {
            min-width: 200px;
            justify-content: center;
        }
        
        /* Mobile navigation improvements */
        .navbar {
            padding: 0.8rem 0;
        }
        
        /* Product cards mobile optimization */
        .product-showcase {
            padding: 0 10px;
        }
        
        /* WhatsApp buttons mobile optimization */
        .whatsapp-order-btn,
        .product-order-btn,
        .direct-whatsapp-btn,
        .cta-button {
            font-size: 1.1rem;
            padding: 1.2rem 2rem;
            border-radius: 30px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        /* Hero section mobile improvements */
        .hero {
            padding-top: 100px;
        }
        
        /* Section spacing mobile */
        .section-header {
            padding: 0 10px;
        }
    }
    
    /* Touch device specific */
    @media (hover: none) and (pointer: coarse) {
        .product-card,
        .benefit-card,
        .testimonial-card,
        .feature {
            transition: transform 0.2s ease;
        }
        
        .product-card:active {
            transform: scale(0.98);
        }
        
        .size-btn:active,
        .qty-btn:active {
            transform: scale(0.95);
        }
        
        /* Remove hover effects that don't work on touch */
        .nav-link:hover::after {
            width: 0;
        }
        
        .nav-link:hover {
            color: #333;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Test if buttons exist
    console.log('Honey type buttons found:', document.querySelectorAll('.honey-type-btn').length);
    console.log('Size buttons found:', document.querySelectorAll('.size-btn').length);
    console.log('WhatsApp button found:', document.getElementById('whatsapp-btn') ? 'Yes' : 'No');
    
    // Initialize all functionality
    addFloatingAnimation();
    initializeButtons();
    initWhatsAppButton();
    initMobileOptimizations();
    updateTotal();
    updatePriceDisplays();
    
    console.log('Initialization complete');
});
