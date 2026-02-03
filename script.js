// Global state
let selectedSize = '1kg';
let quantity = 1;
let currentHoneyType = 'acacia'; // Default to Acacia since Wild is sold out

// Pricing Data
const wildHoneyPrices = {
    '500g': 749,
    '1kg': 1399,
    '2kg': 1950,
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

// State update functions
function updateTotal() {
    const prices = currentHoneyType === 'wild' ? wildHoneyPrices : acaciaHoneyPrices;
    const price = prices[selectedSize];
    const totalElement = document.getElementById('total-price');
    const totalDisplay = document.getElementById('total-display');

    if (typeof price === 'number') {
        const totalValue = price * quantity;
        totalElement.textContent = totalValue;
        totalDisplay.style.display = 'block';
    } else {
        totalDisplay.innerHTML = `<span id="total-price">${price} to order</span>`;
    }
}

function updateInventoryUI() {
    const isWildSoldOut = true; // Business requirement: Wild Honey is sold out
    
    // Update product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const overlay = card.querySelector('.sold-out-overlay');
        const btn = card.querySelector('.product-order-btn');
        
        if (currentHoneyType === 'wild' && isWildSoldOut) {
            if (overlay) overlay.style.display = 'flex';
            if (btn) btn.disabled = true;
            card.style.opacity = "0.8";
        } else {
            if (overlay) overlay.style.display = 'none';
            if (btn) btn.disabled = false;
            card.style.opacity = "1";
        }
    });

    // Update order form
    const orderBtn = document.getElementById('whatsapp-btn');
    const soldOutMsg = document.getElementById('sold-out-message');
    
    if (currentHoneyType === 'wild' && isWildSoldOut) {
        if (orderBtn) orderBtn.disabled = true;
        if (orderBtn) orderBtn.style.opacity = '0.5';
        if (soldOutMsg) soldOutMsg.style.display = 'block';
    } else {
        if (orderBtn) orderBtn.disabled = false;
        if (orderBtn) orderBtn.style.opacity = '1';
        if (soldOutMsg) soldOutMsg.style.display = 'none';
    }

    // Update prices in display
    const prices = currentHoneyType === 'wild' ? wildHoneyPrices : acaciaHoneyPrices;
    const originals = currentHoneyType === 'wild' ? wildHoneyOriginalPrices : acaciaHoneyOriginalPrices;
    
    document.querySelectorAll('.product-card').forEach(card => {
        const size = card.dataset.size;
        const priceEl = card.querySelector('.product-price');
        const currentPrice = prices[size];
        const originalPrice = originals[size];

        if (priceEl) {
            if (typeof currentPrice === 'number') {
                if (originalPrice) {
                    priceEl.innerHTML = `<span style="text-decoration: line-through; color: #888; font-size: 0.8em; margin-right: 8px;">₹${originalPrice}</span>₹${currentPrice}`;
                } else {
                    priceEl.textContent = `₹${currentPrice}`;
                }
            } else {
                priceEl.textContent = currentPrice;
            }
        }
    });
}

function orderOnWhatsApp(size = null) {
    const finalSize = size || selectedSize;
    const prices = currentHoneyType === 'wild' ? wildHoneyPrices : acaciaHoneyPrices;
    const price = prices[finalSize];
    const honeyName = currentHoneyType === 'wild' ? 'Premium Wild Honey' : 'Pure Acacia Honey';
    
    if (currentHoneyType === 'wild') {
        alert("Wild Honey is currently out of stock. Please try our Acacia Honey!");
        return;
    }

    const priceText = typeof price === 'number' ? `₹${price * (size ? 1 : quantity)}` : price;
    const qtyText = size ? "1" : quantity;

    const message = `Hi Kashmir Valley Honey! I'd like to order:
    
🍯 Type: ${honeyName}
📦 Size: ${finalSize}
🔢 Quantity: ${qtyText}
💰 Total: ${priceText}

Please let me know about delivery in Delhi. Thank you!`;

    const phoneNumber = '917006620509';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function openWhatsApp() {
    const message = `Hi! I'm interested in your Kashmiri Honey. Could you please share the latest availability and pricing for Delhi delivery?`;
    const phoneNumber = '917006620509';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialization
function init() {
    // Mobile Menu
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // Honey Type Selection
    document.querySelectorAll('.honey-type-btn, .honey-type-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            currentHoneyType = type;
            
            // Sync active classes
            document.querySelectorAll(`[data-type]`).forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.add('active'));
            
            updateInventoryUI();
            updateTotal();
        });
    });

    // Size Selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedSize = this.dataset.size;
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateTotal();
        });
    });

    // Quantity
    document.querySelector('.qty-btn.minus')?.addEventListener('click', () => {
        if (quantity > 1) { quantity--; document.querySelector('.quantity').textContent = quantity; updateTotal(); }
    });
    document.querySelector('.qty-btn.plus')?.addEventListener('click', () => {
        quantity++; document.querySelector('.quantity').textContent = quantity; updateTotal();
    });

    // Order Form Button
    document.getElementById('whatsapp-btn')?.addEventListener('click', () => orderOnWhatsApp());

    // Fade-in animations (Optimized for Mobile)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature, .benefit-card, .product-card, .testimonial-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.5s ease-out";
        observer.observe(el);
    });

    // Initial load
    updateInventoryUI();
    updateTotal();
}

document.addEventListener('DOMContentLoaded', init);
