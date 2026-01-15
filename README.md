# Poonch Valley Honey - Business Website

A beautiful, elegant website for your pure wild honey business from Poonch, Jammu. Features smooth animations, WhatsApp integration for orders, and responsive design.

## Features

- 🍯 Elegant design showcasing pure wild honey
- 📱 Fully responsive for all devices
- ✨ Smooth animations and interactive elements
- 📞 WhatsApp integration for easy ordering
- 🛒 Product variants (500g, 1kg, 3kg, 5kg)
- 🚀 Optimized for Vercel deployment

## Setup Instructions

### 1. Update Your Information

Before deploying, update these placeholders in the code:

**In `script.js`:**
- Replace `[YOUR_PHONE_NUMBER]` with your WhatsApp number (include country code, e.g., 919876543210)

**In `index.html` and `script.js`:**
- Replace `[price]` placeholders with your actual prices
- The current prices in `script.js` are:
  - 500g: ₹300
  - 1kg: ₹500
  - 3kg: ₹1400
  - 5kg: ₹2200

### 2. Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically - no build configuration needed!

### 3. Local Development

```bash
# Install dependencies (optional)
npm install

# Run local server
npm run dev
# or
npx serve .
```

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── package.json        # Project configuration
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## Customization

### Colors
The website uses a warm, honey-inspired color palette:
- Primary: #d4a574 (Golden honey)
- Secondary: #8fbc8f (Natural green)
- WhatsApp: #25d366 (WhatsApp green)

### Animations
- Floating honey jar in hero section
- Flying bees animation
- Smooth scroll effects
- Hover animations on cards and buttons
- Ripple effects on button clicks

### WhatsApp Integration
When customers click "Order via WhatsApp", it opens WhatsApp with a pre-filled message containing:
- Product details
- Selected size and quantity
- Total price
- Professional greeting

## SEO Optimized
- Semantic HTML structure
- Meta tags ready for customization
- Fast loading times
- Mobile-first responsive design

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License
MIT License - feel free to customize for your business needs.

---

**Ready to launch your honey business online!** 🍯✨
