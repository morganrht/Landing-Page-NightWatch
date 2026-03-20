// Service Worker pour Night Watch Landing Page
// Version: 1.0.0
// Provides: Offline support, Cache management, background sync

const CACHE_VERSION = 'v1';
const CACHE_NAME = `nightwatch-landing-${CACHE_VERSION}`;

// Liste des fichiers à mettre en cache au premier accès
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
];

// ================== INSTALL EVENT ================== 
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation en cours...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[Service Worker] Cache créé: ${CACHE_NAME}`);
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Fichiers statiques mis en cache');
                // Force le service worker à devenir actif
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Erreur lors de l\'installation:', error);
            })
    );
});

// ================== ACTIVATE EVENT ================== 
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activation en cours...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Supprime les anciens caches
                            return cacheName !== CACHE_NAME && cacheName.startsWith('nightwatch-landing-');
                        })
                        .map((cacheName) => {
                            console.log(`[Service Worker] Suppression du cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Nettoyage des caches terminé');
                return self.clients.claim();
            })
    );
});

// ================== FETCH EVENT ================== 
self.addEventListener('fetch', (event) => {
    // Ignore les requêtes non-GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Ignore les requêtes vers l'app réelle (nightwatch-app.vercel.app)
    if (event.request.url.includes('nightwatch-app.vercel.app')) {
        // Utilise le réseau pour l'app réelle
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
        return;
    }
    
    // Stratégie Cache-First pour les assets statiques
    if (isStaticAsset(event.request.url)) {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(event.request)
                        .then((response) => {
                            // Clone la réponse
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                            
                            return response;
                        });
                })
                .catch(() => {
                    // Fallback offline
                    if (event.request.destination === 'image') {
                        return new Response(
                            '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#f0f0f0" width="200" height="200"/><text x="100" y="100" text-anchor="middle" dy=".3em">Offline</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    }
                    
                    return new Response('Offline - Veuillez vérifier votre connexion', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                })
        );
    } else {
        // Stratégie Network-First pour les autres requêtes
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Vérifie que la réponse est valide
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    
                    // Clone et met en cache
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                })
                .catch(() => {
                    // Fallback au cache
                    return caches.match(event.request)
                        .then((response) => {
                            return response || new Response('Offline', { status: 503 });
                        });
                })
        );
    }
});

// ================== HELPER FUNCTIONS ================== 

/**
 * Vérifie si l'URL est un asset statique
 */
function isStaticAsset(url) {
    const extensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf'];
    return extensions.some((ext) => url.endsWith(ext));
}

// ================== MESSAGES FROM CLIENT ================== 

self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message reçu:', event.data);
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME)
            .then(() => {
                console.log('[Service Worker] Cache vidé');
                event.ports[0].postMessage({ ok: true });
            });
    }
});

// ================== BACKGROUND SYNC (Optional) ================== 

// Pour futures intégrations: sync d'événements en arrière-plan
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    
    if (event.tag === 'sync-user-data') {
        event.waitUntil(
            // Ajouter la logique de sync ici si nécessaire
            Promise.resolve()
        );
    }
});

console.log('[Service Worker] Night Watch Landing Page - Service Worker prêt!');
