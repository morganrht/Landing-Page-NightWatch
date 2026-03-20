# 📋 Notes Techniques & Bonnes Pratiques

## 🎯 Vue d'ensemble du Projet

**Night Watch Landing Page** est une Progressive Web App (PWA) moderne et responsif conçue pour promouvoir l'application Night Watch.

### Caractéristiques Clés
- ✅ 100% Vanilla JavaScript (zéro dépendances)
- ✅ Design mobile-first responsive
- ✅ PWA-ready avec Web App Manifest
- ✅ Service Worker optionnel pour offline support
- ✅ Animations fluides et UX moderne
- ✅ WCAG 2.1 AA Accessibilité
- ✅ Optimisé pour Lighthouse (>90)

---

## 🏗️ Architecture

### Structure des Fichiers

```
nightwatch-landing/
├── index.html                   # Page principale (structure sémantique)
├── styles.css                   # Styling complet (CSS3 custom properties)
├── script.js                    # Logique interactive (PWA, FAQ, animations)
├── service-worker.js            # Service worker (cache, offline)
├── manifest.json                # Web App Manifest (PWA metadata)
├── IMG_0831.PNG                # Screenshot de l'app (hero section)
├── README.md                    # Documentation principale
├── GITHUB_PAGES_SETUP.md        # Guide déploiement GitHub Pages
├── TECHNICAL_NOTES.md           # Ce fichier
└── .gitignore                   # Fichiers ignorés par Git
```

### Fluxe De Données

```
User Browser
    ↓
index.html (HTML5 sémantique)
    ├── Navbar (sticky)
    ├── Hero (+ mockup iPhone avec IMG_0831.PNG)
    ├── Features (8 cartes)
    ├── FAQ (accordéon interactif)
    ├── Testimonials (3 profils)
    ├── CTA Section
    └── Footer
    ↓
styles.css (CSS3 avec custom properties)
    ├── Variables (couleurs, spacing, shadows)
    ├── Typography
    ├── Components (buttons, cards, etc.)
    ├── Animations (fade-in, slide, scale)
    └── Responsive (media queries)
    ↓
script.js (Vanilla JavaScript)
    ├── PWA Install (beforeinstallprompt)
    ├── FAQ Logic (accordéon toggle)
    ├── Animations (Intersection Observer)
    ├── Navigation (smooth scroll)
    └── Performance (Service Worker)
```

---

## 🔧 Technologies Utilisées

### Frontend Stack
| Technologie | Version | Usage |
|------------|---------|-------|
| HTML5 | Latest | Structure sémantique |
| CSS3 | Latest | Styling, animations, responsive |
| JavaScript (Vanilla) | ES6+ | Interactions, PWA logic |
| Web APIs | Latest | Service Worker, Intersection Observer |

### Standards & APIs
- ✅ **Web App Manifest** (PWA metadata)
- ✅ **beforeinstallprompt** API (PWA install)
- ✅ **Service Worker** (offline caching)
- ✅ **Intersection Observer** (lazy animations)
- ✅ **History API** (smooth navigation)
- ✅ **localStorage** (optionnel pour preferences)

### Pas de Frameworks
❌ Pas de React, Vue, Angular
❌ Pas de dépendances npm
❌ Pas de bundler webpack/rollup

**Avantages:**
- ✅ Zero dependencies
- ✅ Petite taille (< 50KB HTML+CSS+JS)
- ✅ Performance maximale
- ✅ Maintenance simple
- ✅ Déploiement rapide

---

## 🎨 Design System

### Couleurs (CSS Variables)

```css
--primary: #1e3a8a          /* Bleu foncé Night Watch */
--primary-dark: #1e40af     /* Bleu plus foncé (hover) */
--primary-light: #3b82f6    /* Bleu clair */
--accent: #06b6d4           /* Cyan/Turquoise */
--success: #10b981          /* Vert */
--danger: #ef4444           /* Rouge */
--dark: #0f172a             /* Quasi noir */
--light: #f8fafc            /* Quasi blanc */
--gray: #64748b             /* Gris principal */
--gray-light: #e2e8f0       /* Gris clair */
```

### Typography

```css
h1: clamp(2rem, 5vw, 3.5rem)    /* Responsive scaling */
h2: clamp(1.75rem, 4vw, 2.5rem)
h3: 1.5rem
body: 16px / 1.6 line-height
font-family: System fonts (Apple, Google, etc.)
```

### Spacing (8px base unit)

```css
--spacing-xs: 0.5rem   (4px)
--spacing-sm: 1rem     (8px)
--spacing-md: 1.5rem   (12px)
--spacing-lg: 2rem     (16px)
--spacing-xl: 3rem     (24px)
--spacing-2xl: 4rem    (32px)
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

---

## 📱 Responsive Design

### Breakpoints

```css
Mobile:   < 640px   (max-width: 640px)
Tablet:   640px-1024px
Desktop:  > 1024px  (min-width: 1024px)
```

### Mobile-First Approach

```css
/* Base styles (mobile) */
body { font-size: 16px; }
.feature-card { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 640px) {
    /* Overrides for tablet */
}

/* Desktop */
@media (min-width: 1024px) {
    /* Overrides for desktop */
}
```

### iPhone Mockup

```css
.iphone-frame {
    border-radius: 40px;
    aspect-ratio: 9/19.5;   /* iPhone ratio */
    transform: perspective() rotateY();  /* 3D effect */
    padding: 12px;          /* Device bezel */
}
```

---

## ⚡ Performance Optimizations

### Current Metrics

```
Initial Load Time:     < 1s
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
```

### Techniques Implémentées

1. **Critical CSS**
   - Inline essentials styles (navbar, hero)
   - Defer non-critical (animations, effects)

2. **Images**
   - IMG_0831.PNG: JPEG compressé
   - Icons: SVG inline (zéro requêtes externes)
   - Lazy loading via Intersection Observer

3. **JavaScript**
   - Minimal critical path
   - Event listeners optimisés
   - No third-party scripts

4. **Caching**
   - Service Worker cache-first pour assets
   - Network-first pour content
   - Static assets cached indefinitely

5. **Network**
   - Aucune requête externe (sauf images)
   - GZIP compression (automatique)
   - HTTP/2 support (GitHub Pages)

### Lighthouse Optimization

Pour maintenir Lighthouse > 90:

```
✅ Performance: Optimize images, defer non-critical CSS
✅ Accessibility: WCAG AA contrast, labeling, semantic HTML
✅ Best Practices: HTTPS, no console errors, secure code
✅ SEO: Meta tags, structured data, mobile-friendly
```

---

## 🔒 Sécurité

### Mesures Implémentées

1. **HTTPS Obligatoire**
   - GitHub Pages force automatiquement HTTPS
   - Tous les liens via HTTPS

2. **Content Security Policy (CSP)**
   - Pas de inline scripts (future)
   - Pas de `eval()` ou `with` statements
   - Fonts du système ou Google Fonts

3. **Input Sanitization**
   - Pas de user inputs (landing page statique)
   - Liens externes avec `target="_blank" rel="noopener noreferrer"`

4. **RGPD Compliance**
   - Pas de tracking cookies
   - Pas de analytics third-party (suggéré: Google Analytics optionnel)
   - Lien vers Privacy Policy en footer

### Recommandations

```html
<!-- Ajouter Header de Sécurité (serveur) -->
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

---

## ♿ Accessibilité (WCAG 2.1 AA)

### Implémentations

1. **Semantic HTML**
   - `<nav>`, `<main>`, `<section>`, `<footer>`
   - Headings hierarchy (h1 → h6)
   - `<article>`, `<aside>` ou `<figure>`

2. **Color Contrast**
   - Text: 4.5:1 ratio minimum
   - Large text (24px+): 3:1 ratio
   - Icons: 3:1 ratio vs background

3. **Keyboard Navigation**
   - Tous les buttons focusables (tabindex)
   - Focus visible (outline visible)
   - FAQ accordéon: Entrée/Espace pour toggle

4. **ARIA Labels**
   - Nav links avec explicit labels
   - Buttons avec `aria-label` si nécessaire
   - Sections avec `aria-labelledby`

### Tests Recommended

```bash
# Using browser DevTools
1. DevTools > Accessibility > Color Contrast
2. Keyboard-only navigation (Tab, Shift+Tab, Enter)
3. Screen reader test (VoiceOver Mac, NVDA Windows)
4. axe DevTools extension scan
```

---

## 🔄 PWA Implementation

### How Installation Works

```
1. User visits landing page
   ↓
2. beforeinstallprompt event fires
   ↓
3. "Install Night Watch" button activated
   ↓
4. User clicks button
   ↓
5. deferredPrompt.prompt() shows installation dialog
   ↓
6. User confirms installation
   ↓
7. App socially-glow-meter.lovable.app$ is installed
   ↓
8. "appinstalled" event fires
```

### Browser Support

| Browser | PWA | Install Prompt | Fallback |
|---------|-----|---|---|
| Chrome Desktop | ✅ | ✅ beforeinstallprompt | ✅ Direct link |
| Edge | ✅ | ✅ beforeinstallprompt | ✅ Direct link |
| Safari Desktop | ⚠️ | ❌ | ✅ Direct link (share) |
| Firefox | ⚠️ | ✅ | ✅ Direct link |
| Chrome Mobile | ✅ | ✅ beforeinstallprompt | ✅ Direct link |
| Safari iOS | ⚠️ | ❌ | ✅ "Add to Home Screen" (manual) |

### Key Properties

```javascript
beforeinstallprompt    // PWA install event
appinstalled            // After successful install
navigator.standalone    // Running as PWA
manifest.json           // PWA metadata
start_url               // App launch URL
```

---

## 🛠️ Développement Local

### Serveur HTTP Local

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# Resultat: http://localhost:8000
```

### Hot Reload (Auto-refresh)

Optionnel: Installer `browser-sync`
```bash
npm install -g browser-sync
browser-sync start --server --files "*.html, *.css, *.js, *.png"
```

### Testing Tools

```bash
# Lighthouse (DevTools built-in)
- F12 > Lighthouse > Analyze page load

# axe DevTools (Accessibility)
- Download extension > Scan page

# Responsiveness
- DevTools > Toggle device toolbar (Ctrl+Shift+M)
- Test sizes: 375px, 768px, 1440px
```

---

## 📦 Déploiement

### GitHub Pages (Recommandé)

```bash
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 2. Push to GitHub
git remote add origin https://github.com/username/nightwatch-landing.git
git push -u origin main

# 3. Enable Pages
Settings > Pages > Deploy from branch > main
```

**URL Finale:** `https://username.github.io/nightwatch-landing/`

### Alternative: Netlify

```bash
# 1. Connect GitHub repo
# 2. Auto-deploys on push
```

### Alternative: Vercel

```bash
# 1. Import GitHub repo
# 2. Auto-deploys on push
```

---

## 🔄 Maintenance & Updates

### Versioning

```
manifest.json:
"version": "1.0.0"     # Increment on major changes

script.js:
CACHE_VERSION = 'v1'   # Increment to clear cache

service-worker.js:
CACHE_NAME = 'v1'      # Increment to bust cache
```

### Common Updates

**Changer les couleurs:**
```css
/* styles.css */
:root {
    --primary: #new-color;
    --accent: #new-color;
}
```

**Ajouter une section:**
1. HTML dans index.html
2. CSS dans styles.css
3. JS dans script.js si interactive

**Mettre à jour l'image:**
```html
<img src="./NEW_IMAGE.PNG" alt="">
```

**Changer les liens:**
```javascript
// script.js
function openNightWatchApp() {
    window.location.href = 'https://new-url.com';
}
```

### Monitoring

```javascript
// script.js - Lighthouse monitoring
window.addEventListener('load', () => {
    const perfData = performance.timing;
    console.log(`Load time: ${perfData.loadEventEnd - perfData.navigationStart}ms`);
});
```

---

## 🐛 Dépannage

### PWA n'installe pas?

```javascript
// Debug dans console
console.log(deferredPrompt);  // Vérifie l'event
console.log(navigator.serviceWorker);

// Erreur CORS?
// - Vérifier manifest.json est accessible
// - Vérifier start_url est valide
```

### Service Worker non actif?

```javascript
// Vérifier enregistrement
navigator.serviceWorker.getRegistrations()
    .then(registrations => console.log(registrations));

// Vider le cache
caches.keys().then(names => 
    Promise.all(names.map(name => caches.delete(name)))
);
```

### Performance lente?

1. DevTools > Performance tab
2. Enregistrer une session
3. Identifier les bottlenecks (long tasks, repaints)

### Images cassées?

1. Vérifier le chemin relatif
2. Vérifier la casse du filename
3. Vérifier le fichier existe sur le serveur

---

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [PWA Docs](https://web.dev/progressive-web-apps/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Real Device Testing](https://www.browserstack.com/)

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals](https://web.dev/CLS/)

---

## 📝 Changelog

### Version 1.0.0 (2026-03-20)

**Release Initial**
- ✅ Landing page complète
- ✅ Section hero avec mockup iPhone
- ✅ 8 features cards
- ✅ FAQ accordéon interactif
- ✅ 3 testimonials cards
- ✅ PWA install functionality
- ✅ Service Worker caching
- ✅ Mobile-first responsive design
- ✅ Lighthouse > 90 scores
- ✅ WCAG 2.1 AA accessibility

### Roadmap Futur

- 🚀 Blog section
- 🎬 Video testimonials
- 📊 Analytics dashboard
- 🌍 Multi-language support
- 🎨 Theme switcher (dark mode)
- 📧 Contact form avec backend

---

**Dernière mise à jour:** 20 Mars 2026  
**Mainteneur:** Morgan Reichert  
**License:** MIT

---

**Stay Sharp. Stay Safe.** 🌙
