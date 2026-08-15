# Nocturne — Modern Fine Dining Landing Page

An advanced, fully responsive restaurant landing page built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks.

**Concept:** Nocturne — an intimate, candlelit fine-dining restaurant. Obsidian black + brass gold + emerald palette, editorial-style menu layout, rotated side text, and a candle-glow hero, designed to feel distinct rather than templated.

## Folder Structure
```
restaurant-landing-page/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css        (design tokens, layout, components)
│   └── responsive.css   (media queries)
│
├── js/
│   └── script.js        (all interactivity)
│
└── assets/
    ├── images/
    └── icons/
```

## JavaScript Features Implemented
- [x] Responsive mobile menu
- [x] Dynamic menu filtering (menu items generated from a JS array)
- [x] Countdown timer (updates every second)
- [x] Image lightbox (next/prev/close, keyboard arrows + Escape)
- [x] Testimonial slider (auto-rotate + manual dots)
- [x] Reservation modal with validation + success state
- [x] Contact form validation
- [x] Scroll-to-top button
- [x] Scroll reveal animations
- [x] Dark/Light mode toggle (persisted via localStorage)
- [x] Animated counters (About section stats)
- [x] Sticky navbar + active nav link on scroll
- [x] Preloader

## How to preview locally
Open `index.html` directly in your browser — no build step needed.

## How to deploy on GitHub Pages

1. Create a new **public** GitHub repository (e.g. `restaurant-landing-page`).
2. Upload the entire folder structure above (keep `css/`, `js/`, `assets/` as subfolders — don't flatten them).
3. Go to **Settings → Pages**.
4. Under **Source**, choose `Deploy from a branch`.
5. Set **Branch** to `main`, folder to `/ (root)`, then **Save**.
6. Wait 1–2 minutes — your live link will appear at the top of the Pages settings:
   `https://YOUR-USERNAME.github.io/restaurant-landing-page/`
7. Share both links with your mentor:
   - Live site: the link from step 6
   - Repository: `https://github.com/YOUR-USERNAME/restaurant-landing-page`

## Notes
- Images are loaded from Unsplash/randomuser.me — replace with your own by swapping the URLs in `js/script.js` (menu, gallery, testimonials) and `index.html` (hero, about, offer).
- Design tokens (colors, fonts) are CSS variables at the top of `css/style.css` — change them there to re-theme the whole site.
- Menu items, gallery images, and testimonials are all defined as JS arrays in `js/script.js` and rendered dynamically — add or edit entries there.
