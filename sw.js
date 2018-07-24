let versionSw = 'restaurant-rev1';
let urltoCache = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];

//Installation of the Service Worker
self.addEventListener('install', function(ev) {

    ev.waitUntil(
        caches.open(versionSw)
        .then(function(cache) {
            console.log(cache);
            return cache.addAll(urltoCache);
        })
        .then(function() {
            console.log('Service Worker has been installed');
        }).catch(function(err) {
            console.log(err);
        })
    );
});

//Activation of the Service Worker
self.addEventListener('activate', function(ev) {

    ev.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== versionSw) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker has been activated');
        }).catch(function(err) {
            console.log(err);
        })
    );
});

// Fetch updates from network
self.addEventListener('fetch', function(ev) {
    ev.respondWith(
        caches.match(ev.request)
        .then(function(response) {
            console.log('it was found in cache');
            return response || fetch(ev.request);
        }).catch(function(err) {
            console.log(err);
        })
    );
});