const cacheName = 'js13kPWA-v1';

const contentToCache = [
  'index.html',
  'script/index.js',
  'styles/style.css',
  'images/favicon.ico',
  'images/les-josettes-icon-192.png',
  'images/les-josettes-icon-512.png',
  'images/les-josettes-icon-1000.png'
];


self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
        if (key === cacheName) { return; }
        return caches.delete(key);
        }));
    }));
});