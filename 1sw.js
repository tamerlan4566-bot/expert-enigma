const CACHE_NAME = 'mind-palace-cache-v1';
const urlsToCache = [
  './',
  './1index.html',
  './1manifest.json',
  './1icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
