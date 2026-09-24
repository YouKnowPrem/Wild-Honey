/**
 * Kashmir Valley Honey - Core Application Logic
 * Premium e-commerce interactions & WhatsApp integration
 */

// Phone Configuration
const STORE_PHONE = '9103425071';
const STORE_WHATSAPP = '919103425071';

// Product Catalog & Pricing Database
const honeyData = {
    wild: {
        name: 'Wild Mountain Honey',
        badge: 'Sold Out',
        inStock: false,
        origin: 'Pristine Himalayan Forest (8000+ ft)',
        description: 'Harvested from wild mountain beehives in remote northern mountain valleys. Deep golden amber with intense herbal notes.',
        prices: {
            '500g': { current: 649, original: 749, save: 100 },
            '1kg': { current: 1199, original: 1399, save: 200 },
            '2kg': { current: 2199, original: 2599, save: 400 },
            '5kg': { current: 'Contact', original: null, save: null }
        }
    },
    acacia: {
        name: 'Pure Acacia Honey',
        badge: 'In Stock',
        inStock: true,
        origin: 'Kashmir Valley Organic Groves',
        description: 'Delicate, water-clear golden honey from Kashmir Robinia Acacia blossoms. Naturally smooth, slow-crystallizing, and mild sweetness.',
        prices: {
            '500g': { current: 549, original: 649, save: 100 },
            '1kg': { current: 999, original: 1199, save: 200 },
            '2kg': { current: 1799, original: 2199, save: 400 },
            '5kg': { current: 'Contact', original: null, save: null }
        }
    }
};

// Application State (Defaults to Acacia Honey since it is in stock)
let currentType = 'acacia';
let currentSize = '1kg';
let quantity = 1;

/**
 * Format Indian Rupee currency
 */
function formatRupee(amount) {
    if (typeof amount !== 'number') return amount;
    return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Master UI synchronization function
 */
function updateUI() {
    const variety = honeyData[currentType];
    const prices = variety.prices;
    const selectedPriceObj = prices[currentSize];
    const isSoldOut = !variety.inStock;

    // 1. Sync Variety Selector Buttons (Products Section & Order Form)
    document.querySelectorAll('.honey-type-btn, .honey-type-order-btn').forEach(btn => {
        if (btn.getAttribute('data-type') === currentType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Update Variety Description Banner
    const bannerTitle = document.getElementById('variety-banner-title');
    const bannerDesc = document.getElementById('variety-banner-desc');
    const bannerStatus = document.getElementById('variety-banner-status');

    if (bannerTitle) bannerTitle.textContent = variety.name;
    if (bannerDesc) bannerDesc.textContent = variety.description;
    if (bannerStatus) {
        if (variety.inStock) {
            bannerStatus.className = 'variety-status-tag available';
            bannerStatus.innerHTML = '<i class="fas fa-check-circle"></i> In Stock • Fresh Batch';
        } else {
            bannerStatus.className = 'variety-status-tag unavailable';
            bannerStatus.innerHTML = '<i class="fas fa-clock"></i> Next Harvest Soon • Sold Out';
        }
    }

    // 3. Update Product Showcase Cards
    document.querySelectorAll('.product-card').forEach(card => {
        const size = card.getAttribute('data-size');
        const pObj = prices[size];
        if (!pObj) return;

        // Current & Original Price
        const priceCurrentEl = card.querySelector('.price-current');
        const priceOriginalEl = card.querySelector('.price-original');
        const priceSaveEl = card.querySelector('.price-save');
        const overlayEl = card.querySelector('.sold-out-overlay');
        const actionBtn = card.querySelector('.product-action-btn');

        if (priceCurrentEl) {
            if (typeof pObj.current === 'number') {
                priceCurrentEl.textContent = formatRupee(pObj.current);
            } else {
                priceCurrentEl.textContent = pObj.current;
            }
        }

        if (priceOriginalEl) {
            if (pObj.original) {
                priceOriginalEl.textContent = formatRupee(pObj.original);
                priceOriginalEl.style.display = 'inline';
            } else {
                priceOriginalEl.style.display = 'none';
            }
        }

        if (priceSaveEl) {
            if (pObj.save) {
                priceSaveEl.textContent = `Save ${formatRupee(pObj.save)}`;
                priceSaveEl.style.display = 'inline-block';
            } else {
                priceSaveEl.style.display = 'none';
            }
        }

        // Sold-out Overlay toggle
        if (overlayEl) {
            overlayEl.style.display = isSoldOut ? 'flex' : 'none';
        }

        // Action Button Text
        if (actionBtn) {
            if (isSoldOut) {
                actionBtn.disabled = true;
                actionBtn.innerHTML = '<i class="fas fa-ban"></i> Sold Out';
            } else {
                actionBtn.disabled = false;
                if (size === '5kg') {
                    actionBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Inquire Bulk Canister';
                } else {
                    actionBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> Order ' + size;
                }
            }
        }
    });

    // 4. Update Size Option Buttons in Order Form
    document.querySelectorAll('.size-btn').forEach(btn => {
        const size = btn.getAttribute('data-size');
        if (size === currentSize) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        // Update small preview price inside size button
        const previewEl = btn.querySelector('.size-price-tag');
        if (previewEl && prices[size]) {
            const p = prices[size].current;
            previewEl.textContent = typeof p === 'number' ? formatRupee(p) : 'Bulk Inquiry';
        }
    });

    // 5. Update Order Builder Total & Sold-Out Alert
    const soldOutAlert = document.getElementById('sold-out-message');
    if (soldOutAlert) {
        soldOutAlert.style.display = isSoldOut ? 'flex' : 'none';
    }

    const totalEl = document.getElementById('total-price');
    const dispatchNote = document.getElementById('total-dispatch-note');
    const mainOrderBtn = document.getElementById('whatsapp-btn');

    if (totalEl) {
        if (typeof selectedPriceObj.current === 'number') {
            const total = selectedPriceObj.current * quantity;
            totalEl.textContent = formatRupee(total);
            if (dispatchNote) dispatchNote.textContent = '✓ Express Delivery Available across Delhi NCR & Pan-India';
        } else {
            totalEl.textContent = 'Custom Bulk Quote';
            if (dispatchNote) dispatchNote.textContent = 'Wholesale direct dispatch from Kashmir';
        }
    }

    // 6. Update Main WhatsApp Order Button
    if (mainOrderBtn) {
        if (isSoldOut) {
            mainOrderBtn.disabled = false; // Allow user to click to notify
            mainOrderBtn.classList.add('notify-btn');
            mainOrderBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Notify Me When Wild Honey Harvests';
        } else {
            mainOrderBtn.disabled = false;
            mainOrderBtn.classList.remove('notify-btn');
            if (currentSize === '5kg') {
                mainOrderBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Inquire 5kg Canister via WhatsApp`;
            } else {
                const total = selectedPriceObj.current * quantity;
                mainOrderBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Order on WhatsApp • ${formatRupee(total)}`;
            }
        }
    }
}

/**
 * Send Order Details to WhatsApp
 */
function sendWhatsAppOrder() {
    const variety = honeyData[currentType];
    const prices = variety.prices;
    const priceObj = prices[currentSize];

    // If Wild Honey is sold out, send notification inquiry
    if (!variety.inStock) {
        const notifyMsg = `Hi Kashmir Valley Honey! 👋
I would like to be notified as soon as your *Wild Mountain Honey* (${currentSize}) is back in stock.
Please let me know expected harvest timing!`;
        window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(notifyMsg)}`, '_blank');
        return;
    }

    let totalStr = '';
    if (typeof priceObj.current === 'number') {
        const total = priceObj.current * quantity;
        totalStr = formatRupee(total);
    } else {
        totalStr = 'Custom Bulk Quote';
    }

    const message = `🍯 *New Order Inquiry - Kashmir Valley Honey*
----------------------------------------
• *Honey Variety:* ${variety.name}
• *Pack Size:* ${currentSize}
• *Quantity:* ${quantity}
• *Estimated Total:* ${totalStr}
----------------------------------------
📍 *Delivery Details:*
Name:
City / Delivery Address: 
(Delhi NCR / Pan-India)

Please confirm availability and dispatch details!`;

    const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/**
 * Direct general WhatsApp chat
 */
function openWhatsApp(customText) {
    const text = customText || 'Hi! I am interested in ordering pure raw honey from Kashmir Valley.';
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
}

/**
 * Direct Bulk Wholesale inquiry
 */
function openBulkOrder() {
    const bulkMsg = `Hi Kashmir Valley Honey team! 🍯
I am interested in placing a *Bulk / Wholesale Order* (5kg+ canisters).
Please share bulk pricing, packaging, and commercial terms.`;
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(bulkMsg)}`, '_blank');
}

/**
 * Switch variety to Acacia if user clicked "Switch to Acacia"
 */
function switchToAcacia() {
    currentType = 'acacia';
    updateUI();
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Initialize all interactive components
 */
function init() {
    // 1. Honey Variety Selection (Products section & Order Form)
    document.querySelectorAll('.honey-type-btn, .honey-type-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-type');
            if (type && honeyData[type]) {
                currentType = type;
                updateUI();
            }
        });
    });

    // 2. Size Selection Buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const size = btn.getAttribute('data-size');
            if (size) {
                currentSize = size;
                updateUI();
            }
        });
    });

    // 3. Product Cards "Order" CTA Buttons
    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            if (card) {
                const size = card.getAttribute('data-size');
                if (size) {
                    currentSize = size;
                    updateUI();
                    const orderSection = document.getElementById('order');
                    if (orderSection) {
                        orderSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // 4. Quantity Adjusters
    const plusBtn = document.querySelector('.qty-btn.plus');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const qtyDisplay = document.querySelector('.qty-display');

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            if (quantity < 50) {
                quantity++;
                if (qtyDisplay) qtyDisplay.textContent = quantity;
                updateUI();
            }
        });
    }

    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                if (qtyDisplay) qtyDisplay.textContent = quantity;
                updateUI();
            }
        });
    }

    // 5. WhatsApp Main Order Button
    const mainOrderBtn = document.getElementById('whatsapp-btn');
    if (mainOrderBtn) {
        mainOrderBtn.addEventListener('click', sendWhatsAppOrder);
    }

    // 6. Mobile Navigation Menu & Backdrop
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu on nav link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 7. Navbar Sticky Shadow on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });

    // 8. FAQ Accordion Toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 9. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-in-up');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Initial State Sync
    updateUI();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
