// 911 Nails — Service Worker
// V38: catálogo servido dinámicamente en /catalogo (Next.js route handler).
// Cambia CACHE_VERSION en cada despliegue nuevo para forzar actualización.
const CACHE_VERSION = '911nails-v38-4';
const CATALOG_URL = '/catalogo';
const PRECACHE_URLS = [
  CATALOG_URL,
  '/manifest.webmanifest',
  '/911-nails-icon-192.png',
  '/911-nails-icon-512.png',
  '/911-nails-icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Estrategia: network-first para el catálogo (para no servir una versión
// vieja si hay actualización), cache-first para el resto.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' || req.destination === 'document';

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(CATALOG_URL, resClone));
          return res;
        })
        .catch(() => caches.match(CATALOG_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
        return res;
      }).catch(() => cached);
    })
  );
});
