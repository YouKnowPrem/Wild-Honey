// Pricing Data
const wildHoneyPrices = {
    '500g': 699,
    '1kg': 1299,
    '2kg': 1950, // Best Value Price
    '5kg': 'Contact'
};

const acaciaHoneyPrices = {
    '500g': 549,
    '1kg': 999,
    '2kg': 1750,
    '5kg': 'Contact'
};

const wildHoneyOriginalPrices = {
    '500g': 849,
    '1kg': 1599,
    '2kg': 2299,
    '5kg': null
};

const acaciaHoneyOriginalPrices = {
    '500g': 649,
    '1kg': 1199,
    '2kg': 1999,
    '5kg': null
};

// State (Default to Acacia since Wild is sold out)
let currentType = 'acacia';
let currentSize = '1kg';
let quantity = 1;

// UI Updates
function updateUI() {
    // Determine active price list
    const prices = currentType === 'wild' ? wildHoneyPrices : acaciaHoneyPrices;
    const originals = currentType === 'wild' ? wildHoneyOriginalPrices : acaciaHoneyOriginalPrices;
    const price = prices[currentSize];

    // 1. SOLD OUT LOGIC
    // Constraint: Wild honey is sold out.
    const isSoldOut = (currentType === 'wild');

    // Toggle Sold Out Class for Smooth Transition
    document.querySelectorAll('.product-card').forEach(card => {
        if (isSoldOut) {
            card.classList.add('is-sold-out');
            card.querySelector('.product-order-btn').disabled = true;
        } else {
            card.classList.remove('is-sold-out');
            card.querySelector('.product-order-btn').disabled = false;
        }
    });

    // Toggle Message in Order Form
    const soldOutMsg = document.getElementById('sold-out-message');
    if (soldOutMsg) soldOutMsg.style.display = isSoldOut ? 'block' : 'none';

    // Disable/Enable Buttons
    const mainOrderBtn = document.getElementById('whatsapp-btn');
    if (mainOrderBtn) {
        mainOrderBtn.disabled = isSoldOut;
        mainOrderBtn.innerHTML = isSoldOut ? '<i class="fas fa-ban"></i> Currently Sold Out' : '<i class="fab fa-whatsapp"></i> Order via WhatsApp';
    }

    // 2. UPDATE TOTAL PRICE
    const totalEl = document.getElementById('total-price');
    if (totalEl) {
        if (typeof price === 'number') {
            totalEl.parentElement.innerHTML = `Total: <span id="total-price">₹${price * quantity}</span>`;
        } else {
            totalEl.parentElement.innerHTML = `<span id="total-price">${price}</span>`;
        }
    }

    // 3. UPDATE CARD PRICES DISPLAY & BUTTON TEXT
    document.querySelectorAll('.product-card').forEach(card => {
        const size = card.getAttribute('data-size');
        const p = prices[size];
        const originalP = originals[size];
        const priceEl = card.querySelector('.product-price');
        const btnEl = card.querySelector('.product-order-btn');

        // Price Display
        if (priceEl) {
            if (originalP && typeof p === 'number') {
                // Special display for value packs
                priceEl.innerHTML = `<span style="text-decoration: line-through; color: #888; font-size: 0.7em;">₹${originalP}</span> ₹${p}`;
            } else {
                priceEl.textContent = (typeof p === 'number') ? `₹${p}` : p;
            }
        }

        // Button Text Update for 5kg
        if (btnEl && size === '5kg') {
            if (typeof p !== 'number') { // if it's 'Contact'
                btnEl.innerHTML = '<i class="fab fa-whatsapp"></i> Bulk Inquiry';
            } else {
                btnEl.innerHTML = '<i class="fab fa-whatsapp"></i> Order Now';
            }
        }
    });
}

// Event Listeners Setup
function init() {
    // Type Selection
    document.querySelectorAll('.honey-type-btn, .honey-type-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Update active state visually
            const type = btn.getAttribute('data-type');
            currentType = type;

            document.querySelectorAll('.honey-type-btn, .honey-type-order-btn').forEach(b => b.classList.remove('active'));
            // Activate all buttons of this type (top selector + form selector)
            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.add('active'));

            updateUI();
        });
    });

    // Size Selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const size = btn.getAttribute('data-size');
            currentSize = size;

            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateUI();
        });
    });

    // Quantity
    document.querySelector('.qty-btn.plus').addEventListener('click', () => {
        quantity++;
        document.querySelector('.quantity').textContent = quantity;
        updateUI();
    });
    document.querySelector('.qty-btn.minus').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.querySelector('.quantity').textContent = quantity;
            updateUI();
        }
    });

    // WhatsApp Actions
    document.getElementById('whatsapp-btn').addEventListener('click', sendWhatsApp);
    document.querySelectorAll('.product-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                currentSize = card.getAttribute('data-size');
                // Scroll to form to be safe and confirm details
                document.getElementById('order').scrollIntoView({
                    behavior: 'smooth'
                });
                // Update size buttons active state
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                document.querySelector(`.size-btn[data-size="${currentSize}"]`)?.classList.add('active');
                updateUI();
            }
        });
    });

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            q.parentElement.classList.toggle('active');
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- ANIMATION LOGIC (FIXED) ---
    // Intersection Observer for fade-ins using classes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // PARALLAX FIX: Only enable on desktop to prevent mobile jitter
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });

    // Initial UI Sync
    updateUI();
}

function openWhatsApp() {
    window.open('https://wa.me/917006620509?text=Hi! I am interested in Poonch Valley Honey.', '_blank');
}

function sendWhatsApp() {
    if (currentType === 'wild') return; // Double protection against sold out

    const prices = currentType === 'wild' ? wildHoneyPrices : acaciaHoneyPrices;
    const price = prices[currentSize];
    const total = typeof price === 'number' ? `₹${price * quantity}` : price;

    const msg = `Hi! I would like to order:
🍯 Type: ${currentType.toUpperCase()} Honey
📦 Size: ${currentSize}
🔢 Qty: ${quantity}
💰 Total: ${total}`;

    window.open(`https://wa.me/917006620509?text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', init);
