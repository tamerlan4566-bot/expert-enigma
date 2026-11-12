const CACHE_NAME = 'mind-palace-cache-v2';
const urlsToCache = [
  './1index.html',
  './1manifest.json',
  './1icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш Чертогов сохранен');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // Удаляем все старые версии кэша, кроме текущей
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если файл есть в кэше — отдаем его, иначе пробуем скачать. 
        // Если нет интернета — принудительно открываем 1index.html
        return response || fetch(event.request).catch(() => caches.match('./1index.html'));
      })
  );
});

