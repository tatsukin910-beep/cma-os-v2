// Simple Service Worker for CMA OS v2 PWA
self.addEventListener('install', (event) => {
  console.log('CMA OS v2 Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});