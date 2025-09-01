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
        btn.addEventListener('click', function (e) {
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
        btn.addEventListener('click', function (e) {
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
        minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (quantity > 1) {
                quantity--;
                document.querySelector('.quantity').textContent = quantity;
                updateTotal();
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', function (e) {
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
        card.addEventListener('click', function (e) {
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

// Enhanced features from previous version

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

// Add interactive effects for buttons
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

// Add parallax effect to hero section
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

// Enhanced mobile touch interactions
function addMobileTouchEffects() {
    const touchElements = document.querySelectorAll('.product-order-btn, .whatsapp-order-btn, .cta-button, .direct-whatsapp-btn, .size-btn');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });

        element.addEventListener('touchend', function () {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 100);
        });
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');
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

// Update the initialization to include all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing enhanced features...');

    // Initialize core functionality
    initializeAll();

    // Initialize enhanced features
    addFloatingAnimation();
    initMobileOptimizations();

    console.log('All features initialized successfully');
});
