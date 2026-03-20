// ==================== PWA INSTALLATION MODAL ==================== 

const installBtns = document.querySelectorAll('#install-btn, #install-btn-cta');
const modal = document.getElementById('install-modal');
const modalClose = document.getElementById('modal-close');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const navigateBtn = document.getElementById('navigate-btn');

// Affiche le modal
installBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
    });
});

// Ferme le modal
function closeModal() {
    modal.classList.add('hidden');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal.querySelector('.modal-overlay')) {
        closeModal();
    }
});

// Gère les onglets du modal
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retire la classe active de tous les boutons et contenus
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Ajoute la classe active au bouton et contenu cliqués
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Navigation vers l'app
navigateBtn.addEventListener('click', () => {
    console.log('Redirection vers Night Watch (app réelle)...');
    window.location.href = 'https://nightwatch-app.vercel.app';
});

// Ferme le modal au clic en dehors et avec Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

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

// ==================== SHARE BUTTON ====================

const shareBtn = document.getElementById('share-btn');

if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Night Watch – Stay Sharp. Stay Safe.',
            text: 'Découvre Night Watch, l\'app qui rend tes soirées plus sûres avec tes amis 🌙',
            url: 'https://morganrht.github.io/Landing-Page-NightWatch/'
        };

        // Web Share API – natif sur iOS Safari & Android Chrome
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // L'utilisateur a annulé ou erreur – ne rien faire
            }
        } else {
            // Fallback : copier le lien dans le presse-papier
            try {
                await navigator.clipboard.writeText(shareData.url);
                showToast('Lien copié dans le presse-papier !');
            } catch (err) {
                // Dernier recours : sélection manuelle
                showToast('Copiez ce lien : ' + shareData.url);
            }
        }
    });
}

function showToast(message) {
    const existing = document.getElementById('share-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(168, 85, 247, 0.9);
        backdrop-filter: blur(12px);
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 999px;
        font-size: 0.9rem;
        font-family: inherit;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        animation: toastIn 0.3s ease;
    `;

    // Ajoute l'animation keyframe si pas déjà présente
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            @keyframes toastIn {
                from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
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
