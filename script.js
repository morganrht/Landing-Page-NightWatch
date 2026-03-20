// ==================== PWA INSTALLATION ==================== 

// Stratégie simple et directe:
// Quand utilisateur clique "Install", on ouvre l'app réelle
// L'app réelle (social-glow-meter.lovable.app) montrera son PROPRE prompt d'installation PWA

const installBtns = document.querySelectorAll('#install-btn, #install-btn-cta');

// Quand utilisateur clique le bouton "Install"
installBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Ouvre l'app réelle qui propose son propre prompt PWA
        openNightWatchApp();
        
        // Change le texte du bouton (feedback utilisateur)
        const originalText = btn.textContent;
        btn.textContent = '⏳ Ouverture de Night Watch...';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

/**
 * Ouvre l'app Night Watch réelle
 * L'app affichera son propre prompt d'installation PWA
 */
function openNightWatchApp() {
    console.log('Ouverture de Night Watch (app réelle)...');
    
    // Ouvre dans un nouvel onglet - meilleure UX
    const appWindow = window.open('https://social-glow-meter.lovable.app/', '_blank', 'noopener,noreferrer');
    
    if (!appWindow) {
        // Si popup bloquée, redirection classique
        window.location.href = 'https://social-glow-meter.lovable.app/';
    }
}

// ==================== SERVICE WORKER REGISTRATION ==================== 

// Enregistre le service worker si disponible (pour PWA offline support optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
            })
            .catch(err => {
                console.log('Service Worker enregistrement échoué:', err);
            });
    });
}

// ==================== FAQ INTERACTIVE ==================== 

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Ferme les autres items (accordéon)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Bascule l'item actuel
            item.classList.toggle('active');
        });
        
        // Permet la navigation au clavier (Entrée)
        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Rend la question focusable au clavier
        question.setAttribute('tabindex', '0');
    });
    
    // Ouvre le premier item par défaut
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// ==================== SCROLL ANIMATIONS ==================== 

// Intersection Observer pour animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe les éléments animés
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .faq-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== SMOOTH SCROLL & ACTIVE LINKS ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // N'applique le smooth scroll que pour les ancres valides
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const headerOffset = 70; // Hauteur de la navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Met à jour l'URL sans recharger
            history.pushState(null, null, href);
        }
    });
});

// Marque les liens de navigation actifs au scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ==================== PERFORMANCE & ANALYTICS ==================== 

// Log page load time
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
});

// Rapporte les Web Vitals si disponible (Core Web Vitals)
if ('web-vital' in window) {
    try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = window['web-vital'];
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
    } catch (e) {
        console.log('Web Vitals non disponibles');
    }
}

// ==================== UTILITY FUNCTIONS ==================== 

/**
 * Détecte le device type (mobile, tablet, desktop)
 */
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'mobile';
    } else if (/ipad|android/.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

console.log(`Device type: ${getDeviceType()}`);

/**
 * Vérifie le support PWA
 */
function checkPWASupport() {
    const support = {
        serviceWorker: 'serviceWorker' in navigator,
        cacheAPI: 'caches' in window,
        indexedDB: !!window.indexedDB,
        webManifest: !!document.querySelector('link[rel="manifest"]'),
    };
    console.log('PWA Support:', support);
    return support;
}

checkPWASupport();

// ==================== DEBUG MODE ==================== 

// Active le mode debug en développement (décommentez pour debug)
const DEBUG = /* true */ false;

if (DEBUG) {
    console.log('Mode DEBUG activé');
    console.log('deferredPrompt:', deferredPrompt);
    console.log('Device info:', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
    });
}
