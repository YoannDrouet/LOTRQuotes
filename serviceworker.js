var preCacheName = "LOTRQUOTES";
var filesToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './images/*'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(preCacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
const version = '0.0.4';